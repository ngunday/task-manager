import React from 'react';
import { Entity } from '../../model/Shapes';
import { Action } from '../../model/UI';
import { ListItem } from './ListItem';
import { launchDevTools } from '../../utils/launchDevTools';
import { Icon } from '@openfin/ui-library';

interface Props {
    view: Entity;
    icon?: JSX.Element;
}

export const ViewListItem: React.FC<Props> = (props: Props) => {
    const { view, icon } = props;
    const [actions, setActions] = React.useState<Action[]>([]);
    const [details, setDetails] = React.useState<[string, string][]>([]);

    React.useEffect(() => {
        setActions([
            {
                icon: <Icon icon={'InputIcon'} />,
                action: launchDevTools(view.uuid, view.name),
                tooltip: 'Launch Developer Tools',
            },
            {
                icon: <Icon icon={'ExitIcon'} />,
                tooltip: 'Destroy View',
                action: async () => {
                    const v = await fin.View.wrap({ uuid: view.uuid || '', name: view.name || '' });
                    try {
                        v.destroy();
                    } catch (e) {
                        /* do nothing */
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

    return (
        <ListItem
            name={view.displayName}
            typePill={{ text: 'View', icon: <Icon icon={'GroupIcon'} size={'small'} /> }}
            actions={actions}
            pid={view.pid}
            icon={icon}
            details={details}
            indentation={2}
        />
    );
};
