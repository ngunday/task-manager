import React from 'react';
import styled from 'styled-components';
import { Action as ActionData } from '../../model/Shapes';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  actions: ActionData[];
}

export const ActionBar: React.FC<Props> = (props: Props) => {
  const { actions } = props;

  const handleClick = (callback: () => void) => (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    callback && callback();
  };

  return (
    <Container {...props}>
      {actions.map((action, index) => (
        <Action onClick={handleClick(action.action)} selected={!!action.active} key={`${name}-${index}`}>
          {action.icon}
          <Tooltip>{action.tooltip}</Tooltip>
        </Action>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  padding-left: ${({ theme }) => theme.px.xxxlarge};
  overflow-x: hidden;
`;
const Tooltip = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.palette.background1};
  border: 1px solid ${({ theme }) => theme.palette.background5};
  transition: opacity ${({ theme }) => theme.transition.base};
  box-shadow: ${({ theme }) => `rgb(0 0 0 / 25%) 0px ${theme.px.xsmall} ${theme.px.xsmall}`};
  top: ${({ theme }) => `-${theme.px.xxlarge}`};
  opacity: 0;
  pointer-events: none;
  padding: ${({ theme }) => `${theme.px.xsmall} ${theme.px.small}`};
  overflow: hidden;
  z-index: 200;
`;
const Action = styled.div<{ selected: boolean }>`
  height: ${({ theme }) => theme.px.xxlarge};
  min-width: ${({ theme }) => theme.px.xxlarge};
  padding: ${({ theme }) => theme.px.xsmall};
  display: flex;
  margin-right: ${({ theme }) => theme.px.small};
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, selected }) => (selected ? theme.palette.brandPrimary : theme.palette.background5)};
  border-radius: ${({ theme }) => theme.radius.small};
  &:hover ${Tooltip} {
    opacity: 1;
  }
  &:hover {
    background-color: ${({ theme }) => theme.palette.brandPrimaryHover};
  }
  &:active {
    background-color: ${({ theme }) => theme.palette.brandPrimaryActive};
  }
`;
