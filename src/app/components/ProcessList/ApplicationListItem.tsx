import { FC, useState, useEffect } from 'react';
import { Application } from '../../model/Shapes';
import { Action, Modals } from '../../model/UI';
import { launchDevTools } from '../../utils/launchDevTools';
import { ListItem } from './ListItem';
import { WindowListItem } from './WindowListItem';
import { EntityLogo } from '../AppLogo/EntityLogo';
import { Pulse } from '../Graph/Pulse';
import { Pill } from '../../model/UI';
import { showModal } from '../../store/slices/modal';
import { useDispatch } from 'react-redux';

interface Props {
    application: Application;
}

export const ApplicationListItem: FC<Props> = ({ application }) => {
    const dispatch = useDispatch();
    const [showWindows, setShowWindows] = useState(false);
    const [actions, setActions] = useState<Action[]>([]);
    const [details, setDetails] = useState<[string, string][]>([]);
    const [icon, setIcon] = useState<JSX.Element | undefined>();

    useEffect(() => {
        const conditionalActions: Action[] = [];
        if (application.isRunning) {
            conditionalActions.push({
                icon: 'InputIcon',
                action: launchDevTools(application.uuid),
                tooltip: 'Launch Developer Tools',
            });
        }
        setActions([
            {
                icon: 'ReaderIcon',
                action: async () => {
                    const app = await fin.Application.wrap({ uuid: application.uuid || '' });
                    try {
                        const manifest = await app.getManifest();
                        dispatch(
                            showModal({
                                type: Modals.ManifestViewer,
                                title: `${application.displayName} Manifest`,
                                payload: manifest,
                            })
                        );
                    } catch (e) {
                        console.error(`Could not get the manifest data for application ${application.uuid} (${e})`);
                    }
                },
                tooltip: 'Show Manifest',
            },
            ...conditionalActions,
            {
                icon: 'ExitIcon',
                action: async () => {
                    const app = await fin.Application.wrap({ uuid: application.uuid || '' });
                    try {
                        app.quit();
                    } catch (e) {
                        console.error(`Could not close application with ${application.uuid} (${e})`);
                    }
                },
                tooltip: 'Quit Application',
            },
        ]);

        setDetails([
            ['UUID', application.uuid],
            ['Manifest', application.manifestUrl],
            ['URL', application.url],
        ]);

        setIcon(<EntityLogo src={application.icon} size="xlarge" alt={application.displayName} />);
    }, [application]);

    const warningPill: Pill | undefined = !application.isRunning
        ? {
              icon: 'MoonIcon',
              text: '',
              tooltip: 'This application is not running.',
          }
        : undefined;

    const typePill: Pill = application.isPlatform
        ? { text: 'platform', icon: 'LayersIcon' }
        : { text: 'application', icon: 'DashboardIcon' };

    return (
        <>
            <ListItem
                name={application.displayName}
                icon={icon}
                cpuUsage={application.cpuUsage}
                memUsage={application.memUsage}
                pid={application.pid}
                warning={warningPill}
                runtime={application.runtime}
                typePill={typePill}
                details={details}
                expanded={showWindows}
                onExpand={application.windows.length > 0 ? () => setShowWindows(!showWindows) : undefined}
                actions={actions}
            >
                <Pulse uuid={application.uuid} />
            </ListItem>
            {showWindows &&
                application.windows.map((window) => (
                    <WindowListItem window={window} icon={icon} key={`window-${window.uuid}-${window.name}`} />
                ))}
        </>
    );
};
