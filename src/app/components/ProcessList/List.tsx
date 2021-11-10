import React from 'react';
import { Application } from '../../model/Shapes';
import { ApplicationListItem } from './ApplicationListItem';
import { ListHeader } from './ListHeader';

interface Props {
  applications: Application[];
}

export const List: React.FC<Props> = (props: Props) => {
  const {applications} = props;

  return (
    <>
      <ListHeader />
      {applications.map((application) => (
        <ApplicationListItem key={`p-${application.uuid}`} application={application}/>)
      )}
    </>
  );
}