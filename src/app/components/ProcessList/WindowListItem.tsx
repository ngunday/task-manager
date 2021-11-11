import React from 'react';
import { InputIcon, EyeNoneIcon, EyeOpenIcon, ResetIcon, ExitIcon, BoxModelIcon } from '@modulz/radix-icons';
import { Action, Window } from '../../model/Shapes';
import { ListItem } from './ListItem';
import { ViewListItem } from './ViewListItem';
import { launchDevTools } from '../../utils/launchDevTools';

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
    setActions([
      {
        icon: <InputIcon />,
        action: launchDevTools(window.uuid, window.name),
        tooltip: 'Launch Developer Tools',
      },
      {
        icon: window.isShowing ? <EyeNoneIcon /> : <EyeOpenIcon />,
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
        icon: <ResetIcon />,
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
        icon: <ExitIcon />,
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
    ]);

    setDetails([
      ['Name', window.name],
      ['URL', window.url],
      ['Bounds', `${window.bounds.width}w ${window.bounds.height}h at (${window.bounds.left}, ${window.bounds.top})`],
    ]);
  }, [window]);

  return (
    <>
      <ListItem
        name={window.displayName}
        typePill={{ text: 'window', icon: <BoxModelIcon /> }}
        actions={actions}
        expanded={expanded}
        pid={window.pid}
        indentation={1}
        details={details}
        icon={icon}
        onExpand={
          window.views.length > 0
            ? () => {
                setExpanded(!expanded);
              }
            : undefined
        }
      />
      {expanded &&
        window.views.map((view) => <ViewListItem view={view} icon={icon} key={`view-${view.uuid}-${view.name}`} />)}
    </>
  );
};
