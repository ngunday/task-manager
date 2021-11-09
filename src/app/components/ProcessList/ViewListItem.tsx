import React from 'react';
import { GroupIcon, ExitIcon, InputIcon } from '@modulz/radix-icons';
import { Action, Entity } from '../../model/Shapes';
import { ListItem } from './ListItem';
import { launchDevTools } from '../../utils/launchDevTools';

interface Props {
  view: Entity
}

export const ViewListItem: React.FC<Props> = (props: Props) => {
  const {view} = props;
  const [actions, setActions] = React.useState<Action[]>([]);

  React.useEffect(() => {
    setActions([{
      icon: <InputIcon />,
      action: launchDevTools(view.uuid, view.name),
      tooltip: 'Launch Developer Tools'
      },
      {
        icon: <ExitIcon />,
        tooltip: 'Destroy View',
        action: async () => {
          const v = await fin.View.wrap({ uuid: view.uuid || '', name: view.name || ''});
          try {
            v.destroy();
          } catch (e) { /* do nothing */}
        }
      }
    ]);
  }, [view]);

  return (
    <ListItem 
      name={view.name}
      icon={{text: 'View', icon: <GroupIcon/>}}
      actions={actions}
      pid={view.pid}
      details={[]}
      indentation={2}
      />
  );
}
