import React from 'react';
import { Entity } from '../../model/Shapes';
import { Action, Pill } from '../../model/UI';
import { ListItem } from './ListItem';
import { launchDevTools } from '../../utils/launchDevTools';
import { Icon } from '@openfin/ui-library';

interface Props {
    view: Entity;
    icon?: JSX.Element;
}

export const ViewListItem: React.FC<Props> = ({ view, icon }) => {
    const [actions, setActions] = React.useState<Action[]>([]);
    const [details, setDetails] = React.useState<[string, string][]>([]);

    React.useEffect(() => {
        setActions([
            {
                icon: 'InputIcon',
                action: launchDevTools(view.uuid, view.name),
                tooltip: 'Launch Developer Tools',
            },
            {
                icon: 'ExitIcon',
                tooltip: 'Destroy View',
                action: async () => {
                    const v = await fin.View.wrap({ uuid: view.uuid || '', name: view.name || '' });
                    try {
                        v.destroy();
                    } catch (e) {
                        console.error(`Could not destroy view ${view.uuid}:${view.name} (${e})`);
                    }
                },
            },
        ]);

        setDetails([
            ['Name', view.name],
            ['URL', view.url],
            [
                'Bounds (Relative)',
                `${view.bounds.width}w ${view.bounds.height}h at (${view.bounds.left}, ${view.bounds.top})`,
            ],
        ]);
    }, [view]);

    const typePill: Pill = { text: 'View', icon: 'GroupIcon' };

    return (
        <ListItem
            name={view.displayName}
            typePill={typePill}
            actions={actions}
            pid={view.pid}
            icon={icon}
            details={details}
            indentation={2}
        />
    );
};
