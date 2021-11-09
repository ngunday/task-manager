import React from 'react';
import { MoonIcon, CubeIcon, InputIcon, ExitIcon, DashboardIcon, BoxModelIcon, IdCardIcon } from '@modulz/radix-icons';
import { Action, Application } from '../../model/Shapes';
import { launchDevTools } from '../../utils/launchDevTools';
import { ListItem } from './ListItem';
import { WindowListItem } from './WindowListItem';
import { ProcessListItem } from './ProcessListItem';

interface Props {
  application: Application
}

export const ApplicationListItem: React.FC<Props> = (props: Props) => {
  const {application} = props;
  const [showWindows, setShowWindows] = React.useState(false);
  const [showProcesses, setShowProcesses] = React.useState(false);
  const [actions, setActions] = React.useState<Action[]>([]);

  React.useEffect(() => {
    const conditional = [];
    if (application.isRunning) {
      conditional.push({
        icon: <InputIcon />,
        action: launchDevTools(application.uuid),
        tooltip: 'Launch Developer Tools'
      })
    }
    setActions([...conditional, {
      icon: <ExitIcon/>,
      action: async () => {
        const app = await fin.Application.wrap({ uuid: application.uuid || '' });
        try {
          app.quit();
        } catch (e) { /* do nothing */ }
      },
      tooltip: 'Quit Application'
    }]);
  }, [application]);

  return (
    <>
      <ListItem
        name={application.displayName}
        icon={application.icon}
        cpuUsage={application.cpuUsage}
        memUsage={application.memUsage}
        pid={application.pid}
        warning={!application.isRunning ? {icon: <MoonIcon/>, text: 'not running'} : undefined}
        runtime={application.runtime}
        indicator={application.isPlatform ? {text: 'platform', icon: <CubeIcon/>} : undefined}
        details={[['UUID', application.uuid], ['Manifest', application.manifestUrl], ['URL', application.url]]}
        expanded={showWindows}
        onExpand={application.windows.length > 0 ? () => setShowWindows(!showWindows) : undefined}
        actions={actions}
        />
        {showProcesses && application.processes.map((process) =>(
          <ProcessListItem process={process} key={`process-${process.pid}`}/>
        ))}
        {showWindows && application.windows.map((window) =>(
          <WindowListItem window={window} key={`window-${window.uuid}-${window.name}`}/>
        ))}
    </>
  );
}
