import React from 'react';
import { Application } from '../../model/Shapes';
import { Action, Modals } from '../../model/UI';
import { launchDevTools } from '../../utils/launchDevTools';
import { ListItem } from './ListItem';
import { WindowListItem } from './WindowListItem';
import { AppLogo } from '../AppLogo/AppLogo';
import { Pulse } from '../Graph/Pulse';
import { Icon } from '@openfin/ui-library';
import { showModal } from '../../store/slices/modal';
import { useDispatch } from 'react-redux';

interface Props {
    application: Application;
}

export const ApplicationListItem: React.FC<Props> = (props: Props) => {
    const { application } = props;
    const dispatch = useDispatch();
    const [showWindows, setShowWindows] = React.useState(false);
    const [actions, setActions] = React.useState<Action[]>([]);
    const [details, setDetails] = React.useState<[string, string][]>([]);
    const [icon, setIcon] = React.useState<JSX.Element | undefined>();

    React.useEffect(() => {
        const conditional = [];
        if (application.isRunning) {
            conditional.push({
                icon: <Icon icon={'InputIcon'} />,
                action: launchDevTools(application.uuid),
                tooltip: 'Launch Developer Tools',
            });
        }
        setActions([
            {
                icon: <Icon icon={'ReaderIcon'} />,
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
                        /* do nothing */
                    }
                },
                tooltip: 'Show Manifest',
            },
            ...conditional,
            {
                icon: <Icon icon={'ExitIcon'} />,
                action: async () => {
                    const app = await fin.Application.wrap({ uuid: application.uuid || '' });
                    try {
                        app.quit();
                    } catch (e) {
                        /* do nothing */
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

        setIcon(<AppLogo src={application.icon} size="xlarge" alt={application.displayName} />);
    }, [application]);

    return (
        <>
            <ListItem
                name={application.displayName}
                graph={<Pulse uuid={application.uuid} />}
                icon={icon}
                cpuUsage={application.cpuUsage}
                memUsage={application.memUsage}
                pid={application.pid}
                warning={!application.isRunning ? { icon: <Icon icon={'MoonIcon'} />, text: '' } : undefined}
                runtime={application.runtime}
                typePill={
                    application.isPlatform
                        ? { text: 'platform', icon: <Icon icon={'LayersIcon'} size={'small'} /> }
                        : { text: 'application', icon: <Icon icon={'DashboardIcon'} size={'small'} /> }
                }
                details={details}
                expanded={showWindows}
                onExpand={application.windows.length > 0 ? () => setShowWindows(!showWindows) : undefined}
                actions={actions}
            />
            {showWindows &&
                application.windows.map((window) => (
                    <WindowListItem window={window} icon={icon} key={`window-${window.uuid}-${window.name}`} />
                ))}
        </>
    );
};
