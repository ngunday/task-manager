import React from 'react';
import { DashboardIcon } from '@modulz/radix-icons';
import { Process } from '../../model/Shapes';
import { ListItem } from './ListItem';

interface Props {
  process: Process
}

export const ProcessListItem: React.FC<Props> = (props: Props) => {
  const {process} = props;

  return (
    <ListItem 
      name={`PID: ${process.pid}`}
      typePill={{text: 'Process', icon: <DashboardIcon/>}}
      actions={[]}
      cpuUsage={process.cpuUsage}
      memUsage={process.memUsage}
      details={[]}
      />
  );
}
