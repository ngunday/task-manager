import React from 'react';
import styled from 'styled-components';
import { useProcessPoll } from '../hooks/useProcessPoll';
import { List } from '../components/ProcessList/List';

export const Applications: React.FC = () => {
  const processPoll = useProcessPoll();

  return (
    <Container>
      <List applications={processPoll}/>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: ${({theme}) => theme.palette.background1};
  border-radius: ${({theme}) => theme.radius.base};
  overflow-y: auto;
  border: 1px solid ${({theme}) => theme.palette.background5};
  box-shadow: ${({theme})=> `rgb(0 0 0 / 25%) 0px ${theme.px.xsmall} ${theme.px.xsmall}`};
`;