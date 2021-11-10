import React from 'react';
import styled from 'styled-components';
import { Action as ActionData } from '../../model/Shapes';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  actions: ActionData[];
}

export const ActionBar: React.FC<Props> = (props: Props) => {
  const {actions} = props;

  return (
    <Container {...props}>
      {actions.map((action, index) => (
        <Action onClick={action.action} selected={!!action.active} key={`${name}-${index}`}>
          {action.icon}
        </Action>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  padding-left: ${({theme}) => theme.px.xxxlarge};
  overflow-x: hidden;
`;
const Action = styled.div<{selected: boolean}>`
  height: ${({ theme }) => theme.px.xxlarge};
  min-width: ${({ theme }) => theme.px.xxlarge};
  padding: ${({theme}) => theme.px.xsmall};
  display: flex;
  margin-right: ${({ theme }) => theme.px.small};
  justify-content: center;
  align-items: center;
  background-color: ${({theme, selected}) => selected ? theme.palette.brandPrimary : theme.palette.background5};
  border-radius: ${({theme}) => theme.radius.small};
  &:hover {
    background-color: ${({theme}) => theme.palette.brandPrimaryHover};
  }
  &:active {
    background-color: ${({theme}) => theme.palette.brandPrimaryActive};
  }
`;