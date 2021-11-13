import React from 'react';
import { MoonIcon, InputIcon, ExitIcon, DashboardIcon, LayersIcon } from '@modulz/radix-icons';
import { Application } from '../../model/Shapes';
import { Action } from '../../model/UI';
import { launchDevTools } from '../../utils/launchDevTools';
import { ListItem } from './ListItem';
import { WindowListItem } from './WindowListItem';
import { AppLogo } from '../AppLogo/AppLogo';
import { Pulse } from '../Graph/Pulse';

interface Props {
  application: Application;
}

export const ApplicationListItem: React.FC<Props> = (props: Props) => {
  const { application } = props;
  const [showWindows, setShowWindows] = React.useState(false);
  const [actions, setActions] = React.useState<Action[]>([]);
  const [details, setDetails] = React.useState<[string, string][]>([]);
  const [icon, setIcon] = React.useState<JSX.Element | undefined>();

  React.useEffect(() => {
    const conditional = [];
    if (application.isRunning) {
      conditional.push({
        icon: <InputIcon />,
        action: launchDevTools(application.uuid),
        tooltip: 'Launch Developer Tools',
      });
    }
    setActions([
      ...conditional,
      {
        icon: <ExitIcon />,
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
        warning={!application.isRunning ? { icon: <MoonIcon />, text: 'not running' } : undefined}
        runtime={application.runtime}
        typePill={
          application.isPlatform
            ? { text: 'platform', icon: <LayersIcon /> }
            : { text: 'application', icon: <DashboardIcon /> }
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
