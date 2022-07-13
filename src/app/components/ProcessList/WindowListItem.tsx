import { FC, useState, useEffect } from 'react';
import { Window } from '../../model/Shapes';
import { Action, Pill } from '../../model/UI';
import { ListItem } from './ListItem';
import { ViewListItem } from './ViewListItem';
import { launchDevTools } from '../../utils/launchDevTools';
import { Layout } from '../Graph/Layout';

interface Props {
    window: Window;
    icon?: JSX.Element;
}

export const WindowListItem: FC<Props> = ({ window, icon }) => {
    const [expanded, setExpanded] = useState(false);
    const [actions, setActions] = useState<Action[]>([]);
    const [details, setDetails] = useState<[string, string][]>([]);

    useEffect(() => {
        let conditionalActions: Action[] = [];
        if (window.uuid !== fin.me.uuid) {
            conditionalActions = [
                {
                    icon: window.isShowing ? 'EyeNoneIcon' : 'EyeOpenIcon',
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
                            console.error(`Could not change visibility of window ${window.uuid}:${window.name} (${e})`);
                        }
                    },
                },
                {
                    icon: 'ResetIcon',
                    tooltip: 'Rescue Off-Screen Window',
                    action: async () => {
                        const win = await fin.Window.wrap({ uuid: window.uuid || '', name: window.name || '' });
                        try {
                            win.show();
                            win.moveTo(100, 100);
                            win.focus();
                            win.bringToFront();
                        } catch (e) {
                            console.error(`Could not rescue window ${window.uuid}:${window.name} (${e})`);
                        }
                    },
                },
                {
                    icon: 'ExitIcon',
                    tooltip: 'Close Window',
                    action: async () => {
                        const win = await fin.Window.wrap({ uuid: window.uuid || '', name: window.name || '' });
                        try {
                            win.close();
                        } catch (e) {
                            console.error(`Could not close window ${window.uuid}:${window.name} (${e})`);
                        }
                    },
                },
            ];
        }
        setActions([
            {
                icon: 'InputIcon',
                action: launchDevTools(window.uuid, window.name),
                tooltip: 'Launch Developer Tools',
            },
            ...conditionalActions,
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

    const typePill: Pill = { text: 'window', icon: 'BoxModelIcon' };

    return (
        <>
            <ListItem
                name={window.displayName}
                typePill={typePill}
                actions={actions}
                expanded={expanded}
                pid={window.pid}
                indentation={1}
                details={details}
                icon={icon}
                onExpand={window.views.length > 0 ? () => setExpanded(!expanded) : undefined}
            >
                {window.views.length && <Layout window={window} />}
            </ListItem>
            {expanded &&
                window.views.map((view) => (
                    <ViewListItem view={view} icon={icon} key={`view-${view.uuid}-${view.name}`} />
                ))}
        </>
    );
};
