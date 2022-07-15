import { Application, Process, Pulse, View, Window } from '../model/Shapes';

interface EntityProcessDetailsExtended extends OpenFin.EntityProcessDetails {
    parent?: OpenFin.Identity;
}

export interface ResourceUsage {
    subProcesses: Process[];
    totalUsage: Process;
}

export async function populateApplications(
    appStates: OpenFin.ApplicationState[],
    providerChannels: OpenFin.ProviderIdentity[],
    pulse: Pulse
) {
    const applications: Application[] = [];
    const promises = appStates.map(async ({ uuid, isPlatform, isRunning }) => {
        /** Actual OpenFin application handle */
        const application = fin.Application.wrapSync({ uuid });

        try {
            /* Details of the application; things like manifest, etc. */
            const applicationInfo = await application.getInfo();
            /* Information about all the entities (views and windows) associated with this application */
            const entityInfo = await application.getProcessInfo();

            /* Extract relevant data from the app manifest (name, icon, url) */
            const { name, icon, url } = extractManifestData(applicationInfo);

            const windowDetails: OpenFin.EntityProcessDetails[] = [];
            const viewDetails: EntityProcessDetailsExtended[] = [];
            entityInfo.entities.forEach(async (entity) => {
                if (entity.entityType === 'window') {
                    windowDetails.push(entity);
                } else {
                    try {
                        /* get the parent window handle for the view from fin */
                        const parentWindow = await fin.View.wrapSync({
                            uuid: entity.uuid || '',
                            name: entity.name,
                        }).getCurrentWindow();

                        viewDetails.push({
                            ...entity,
                            parent: parentWindow.identity,
                        });
                    } catch (e) {
                        console.log(
                            `Could locate the parent window info for view ${entity.name}. Is the window still running? (Error: ${e})`
                        );
                    }
                }
            });

            /* Application PID is the PID of the first window (observational, TODO: verify with core team) */
            const processData = calculateResourceUsage(entityInfo, { uuid }, windowDetails[0]?.pid || 0, pulse);

            applications.push({
                uuid,
                runtime: applicationInfo.runtime.version,
                manifestUrl: applicationInfo.manifestUrl,
                displayName: name || uuid,
                isPlatform,
                isRunning,
                icon,
                url,
                windows: await populateWindows({ uuid }, isPlatform, windowDetails, viewDetails),
                channels: populateChannels({ uuid }, providerChannels),
                processes: processData.subProcesses,
                ...processData.totalUsage,
            });
        } catch (e) {
            console.log(
                `Encountered an issue with the application ${uuid}. Is the application still running? (Error: ${e})`
            );
        }
    });
    await Promise.all(promises);
    return applications;
}

async function populateWindows(
    applicationId: OpenFin.ApplicationIdentity,
    isPlatform: boolean,
    windowDetails: OpenFin.EntityProcessDetails[],
    viewDetails: EntityProcessDetailsExtended[]
) {
    const windows: Window[] = [];
    const promises = windowDetails
        .filter(({ name }) => !isPlatform || applicationId.uuid !== name)
        .map(async ({ uuid, name, pid, url }) => {
            /** Actual OpenFin application handle */
            const win = fin.Window.wrapSync({ uuid, name });

            try {
                const windowInfo = await win.getInfo();
                const bounds = await win.getBounds();
                const isShowing = await win.isShowing();
                const displayName = windowInfo.title || name || '';

                windows.push({
                    uuid,
                    name,
                    pid,
                    url,
                    displayName,
                    bounds,
                    isShowing,
                    views: await populateViews({ uuid, name }, viewDetails),
                });
            } catch (e) {
                console.log(`Encountered an issue with the window ${name}. Is the window still running? (Error: ${e})`);
            }
        });
    await Promise.all(promises);
    return windows;
}

async function populateViews(windowId: OpenFin.Identity, viewDetails: EntityProcessDetailsExtended[]) {
    const views: View[] = [];
    const promises = viewDetails
        .filter(({ parent }) => parent?.uuid === windowId.uuid && parent?.name === windowId.name)
        .map(async ({ uuid, name, pid, url }) => {
            /** Actual OpenFin view handle */
            const view = fin.View.wrapSync({ uuid, name });

            try {
                const viewInfo = await view.getInfo();
                const viewOptions: OpenFin.ViewOptions = await view.getOptions();
                const displayName = viewInfo.title || viewOptions.name || name || uuid;
                const bounds = await view.getBounds();

                views.push({
                    uuid,
                    name,
                    pid,
                    bounds,
                    displayName,
                    url,
                });
            } catch (e) {
                console.log(`Could not locate the view ${name}. Is the view still running? (Error: ${e})`);
            }
        });
    await Promise.all(promises);
    return views;
}

function populateChannels(applicationId: OpenFin.ApplicationIdentity, providerChannels: OpenFin.ProviderIdentity[]) {
    return providerChannels
        .filter(({ uuid, channelName }) => {
            return (
                uuid === applicationId.uuid &&
                /**
                 * Exclude interop channels
                 */
                channelName !== `interop-broker-${applicationId.uuid}` &&
                channelName !== `custom-frame-${applicationId.uuid}`
            );
        })
        .map(({ channelName, channelId }) => ({
            id: channelId,
            name: channelName,
        }));
}

function calculateResourceUsage(
    processInfo: OpenFin.AppProcessInfo,
    applicationId: OpenFin.ApplicationIdentity,
    pid: number,
    pulse: Pulse
): ResourceUsage {
    const { entities } = processInfo;
    const totalUsage: Process = {
        pid,
        cpuUsage: 0,
        memUsage: 0,
    };

    const processTree: Record<number, Process> = {};
    entities.forEach(({ pid, cpuUsage, workingSetSize }) => {
        const group = (processTree[pid] ??= {
            pid,
            cpuUsage: 0,
            memUsage: 0,
        });
        group.cpuUsage = Math.max(group.cpuUsage, cpuUsage);
        group.memUsage = Math.max(group.memUsage, workingSetSize);
    });

    const subProcesses = [...Object.values(processTree)];
    subProcesses.forEach((subProcess) => {
        totalUsage.cpuUsage += subProcess.cpuUsage;
        totalUsage.memUsage += subProcess.memUsage;
    });

    pulse[applicationId.uuid] = totalUsage.cpuUsage;

    return {
        subProcesses,
        totalUsage,
    };
}

function extractManifestData(appInfo: OpenFin.ApplicationInfo) {
    /* Try to get a User Facing Icon and Name */
    let { name, icon } = appInfo.initialOptions;
    let url;
    if (appInfo.manifest) {
        const { shortcut, startup_app: startupApp, platform } = appInfo.manifest as OpenFin.Manifest;
        name = shortcut?.name || startupApp?.name || startupApp?.uuid;
        icon = shortcut?.icon || startupApp?.icon || platform?.icon;
        url = startupApp?.url;
    }
    return { name, icon: icon || '', url: url || '' };
}
