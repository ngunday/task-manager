import { ApplicationOption } from 'openfin/_v2/api/application/applicationOption';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Application, Process, Pulse } from '../model/Shapes';
import { OFManifest, OFApplication, OFApplicationInfo, OFViewCreationOptions } from '../model/OpenFinShim';
import { SortField, SortOrder } from '../model/UI';
import { selectApplications, setApplications } from '../store/slices/applications';
import { submitPulse } from '../store/slices/pulse';
import { selectSortMode } from '../store/slices/sorting';

export const useProcessPoll = (): Application[] => {
  const [unsortedApps, setUnsortedApps] = React.useState<Application[]>([]);
  const dispatch = useDispatch();
  const sortMode = useSelector(selectSortMode);
  const applications = useSelector(selectApplications);

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
                    uuid: view.uuid,
                    name: view.name,
                    pid: view.pid,
                    bounds: await v.getBounds(),
                    displayName: viewOptions.title || view.name,
                    url: viewInfo.url,
                  };
                });
              return {
                uuid: window.uuid,
                name: window.name,
                pid: window.pid,
                bounds: await win.getBounds(),
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

      dispatch(submitPulse(pulse));
      setUnsortedApps(await Promise.all(processMap));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    const asc = sortMode.order === SortOrder.ASCENDING;
    const apps = [...unsortedApps];

    apps.sort((a, b) => {
      switch (sortMode.field) {
        case SortField.CPU: {
          return (a.cpuUsage - b.cpuUsage) * (asc ? 1 : -1);
        }
        case SortField.MEMORY: {
          return (a.memUsage - b.memUsage) * (asc ? 1 : -1);
        }
        case SortField.NAME: {
          // Name sorting is always A->Z
          return a.displayName.localeCompare(b.displayName);
        }
      }
    });

    dispatch(setApplications(apps));
  }, [unsortedApps, sortMode]);

  return applications;
};
