import { ApplicationOption } from 'openfin/_v2/api/application/applicationOption';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  OFManifest,
  OFApplication,
  OFApplicationInfo,
  Application,
  Process,
  OFViewCreationOptions,
  Pulse,
} from '../model/Shapes';
import { selectApplications, setApplications } from '../store/slices/applications';
import { submitPulse } from '../store/slices/pulse';

export const useProcessPoll = (): Application[] => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const pulse: Pulse = {};
    const interval = setInterval(async () => {
      const applicationsInfo = (await fin.System.getAllApplications()).filter((app) => app.uuid);
      const processMap = applicationsInfo.map(async (info) => {
        const appInfo = info as OFApplicationInfo; //uuid, isPlatform, isRunning
        const app = fin.Application.wrapSync({ uuid: appInfo.uuid }) as OFApplication;

        /* Try to get a User Facing Icon and Name */
        const appDetails = await app.getInfo(); //name, icon, runtime
        let { name, icon } = appDetails.initialOptions as ApplicationOption;
        let url;
        if (appDetails.manifest) {
          const { shortcut, startup_app: startupApp, platform } = appDetails.manifest as OFManifest;
          name = shortcut?.name || startupApp?.name || startupApp?.uuid;
          icon = shortcut?.icon || startupApp?.icon || platform?.applicationIcon;
          url = startupApp?.url;
        }

        const processInfo = await app.getProcessInfo(); //entities

        const windowEntities = processInfo.entities.filter((entity) => entity.entityType === 'window');
        const viewEntities = processInfo.entities.filter((entity) => entity.entityType === 'view');
        viewEntities.forEach(async (entity) => {
          const parentWindow = await fin.View.wrapSync({
            uuid: entity.uuid || '',
            name: entity.name,
          }).getCurrentWindow();
          entity.parent = parentWindow.identity;
        });

        const windows = await Promise.all(
          windowEntities
            .filter((window) => !appInfo.isPlatform || appInfo.uuid !== window.name)
            .map(async (window) => {
              const win = await fin.Window.wrapSync({ uuid: window.uuid || '', name: window.name || '' });
              const isShowing = await win.isShowing();
              const windowInfo = await win.getInfo();

              const views = viewEntities
                .filter((view) => view.parent?.uuid === window.uuid && view.parent?.name === window.name)
                .map(async (view) => {
                  const v = fin.View.wrapSync({ uuid: view.uuid || '', name: view.name || '' });
                  const viewInfo = await v.getInfo();
                  const viewOptions: OFViewCreationOptions = await v.getOptions();
                  return {
                    pid: view.pid,
                    uuid: view.uuid,
                    name: view.name,
                    displayName: viewOptions.title || view.name,
                    url: viewInfo.url,
                  };
                });
              return {
                bounds: await win.getBounds(),
                uuid: window.uuid,
                name: window.name,
                pid: window.pid,
                displayName: windowInfo.title || window.name,
                url: windowInfo.url,
                isShowing,
                views: await Promise.all(views),
              };
            })
        );

        const resourceUsage = {
          cpuUsage: 0,
          memUsage: 0,
        };

        const processTree: Record<number, Process> = {};
        processInfo.entities.forEach((entity) => {
          const group = (processTree[entity.pid] ??= {
            pid: entity.pid,
            cpuUsage: 0,
            memUsage: 0,
          });
          group.cpuUsage = Math.max(group.cpuUsage, entity.cpuUsage);
          group.memUsage = Math.max(group.memUsage, entity.workingSetSize);
        });

        const processes = [...Object.values(processTree)];
        processes.forEach((processGroup) => {
          resourceUsage.cpuUsage += processGroup.cpuUsage;
          resourceUsage.memUsage += processGroup.memUsage;
        });

        pulse[appInfo.uuid] = resourceUsage.cpuUsage;

        return {
          uuid: appInfo.uuid,
          pid: windowEntities[0]?.pid || 0,
          isPlatform: appInfo.isPlatform,
          isRunning: appInfo.isRunning,
          icon: icon || '',
          displayName: name || appInfo.uuid,
          runtime: appDetails.runtime.version,
          manifestUrl: appDetails.manifestUrl,
          url: url || '',
          ...resourceUsage,
          processes,
          windows,
        };
      });

      const applications = await Promise.all(processMap);
      applications.sort((a, b) => a.displayName.localeCompare(b.displayName));

      dispatch(submitPulse(pulse));
      dispatch(setApplications(applications));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return useSelector(selectApplications);
};
