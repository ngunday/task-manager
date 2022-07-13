import React from 'react';
import { Window } from '../../model/Shapes';
import { Action } from '../../model/UI';
import { ListItem } from './ListItem';
import { ViewListItem } from './ViewListItem';
import { launchDevTools } from '../../utils/launchDevTools';
import { Layout } from '../Graph/Layout';
import { Icon } from '@openfin/ui-library';

interface Props {
    window: Window;
    icon?: JSX.Element;
}

export const WindowListItem: React.FC<Props> = (props: Props) => {
    const { window, icon } = props;
    const [expanded, setExpanded] = React.useState(false);
    const [actions, setActions] = React.useState<Action[]>([]);
    const [details, setDetails] = React.useState<[string, string][]>([]);

    React.useEffect(() => {
        let conditional: Action[] = [];
        if (window.uuid !== fin.me.uuid) {
            conditional = [
                {
                    icon: <Icon icon={window.isShowing ? 'EyeNoneIcon' : 'EyeOpenIcon'} />,
                    tooltip: window.isShowing ? 'Hide Window' : 'Show Window',
                    active: window.isShowing,
                    action: async () => {
                        const win = await fin.Window.wrap({ uuid: window.uuid || '', name: window.name || '' });
                        try {
                            if (window.isShowing) {
                                win.hide();
                            } else {
                                win.show();
                            }
                        } catch (e) {
                            /* do nothing */
                        }
                    },
                },
                {
                    icon: <Icon icon={'ResetIcon'} />,
                    tooltip: 'Rescue Off-Screen Window',
                    action: async () => {
                        const win = await fin.Window.wrap({ uuid: window.uuid || '', name: window.name || '' });
                        try {
                            win.show();
                            win.moveTo(100, 100);
                            win.focus();
                            win.bringToFront();
                        } catch (e) {
                            /* do nothing */
                        }
                    },
                },
                {
                    icon: <Icon icon={'ExitIcon'} />,
                    tooltip: 'Close Window',
                    action: async () => {
                        const win = await fin.Window.wrap({ uuid: window.uuid || '', name: window.name || '' });
                        try {
                            win.close();
                        } catch (e) {
                            /* do nothing */
                        }
                    },
                },
            ];
        }
        setActions([
            {
                icon: <Icon icon={'InputIcon'} />,
                action: launchDevTools(window.uuid, window.name),
                tooltip: 'Launch Developer Tools',
            },
            ...conditional,
        ]);

        setDetails([
            ['Name', window.name],
            ['URL', window.url],
            [
                'Bounds',
                `${window.bounds.width}w ${window.bounds.height}h at (${window.bounds.left}, ${window.bounds.top})`,
            ],
        ]);
    }, [window]);

    return (
        <>
            <ListItem
                name={window.displayName}
                typePill={{ text: 'window', icon: <Icon icon={'BoxModelIcon'} size={'small'} /> }}
                actions={actions}
                expanded={expanded}
                pid={window.pid}
                indentation={1}
                details={details}
                icon={icon}
                graph={window.views.length > 0 ? <Layout window={window} /> : undefined}
                onExpand={window.views.length > 0 ? () => setExpanded(!expanded) : undefined}
            />
            {expanded &&
                window.views.map((view) => (
                    <ViewListItem view={view} icon={icon} key={`view-${view.uuid}-${view.name}`} />
                ))}
        </>
    );
};
