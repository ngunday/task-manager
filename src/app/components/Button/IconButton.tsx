import React from 'react';
import styled, { css } from 'styled-components';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  icon: JSX.Element;
  action?: () => void;
  tooltip?: string;
  active?: boolean;
  transparent?: boolean;
}

export const IconButton: React.FC<Props> = (props: Props) => {
  const { icon, action, tooltip, active = false, transparent = false, ...rest } = props;

  const handleClick = (actionCb?: () => void) => (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    actionCb && actionCb();
  };

  return (
    <Container onClick={handleClick(action)} selected={active} transparent={transparent} {...rest}>
      {icon}
      {tooltip && <Tooltip>{tooltip}</Tooltip>}
    </Container>
  );
};

const Tooltip = styled.div`
  position: absolute;
  transition: opacity ${({ theme }) => theme.transition.base};
  background-color: ${({ theme }) => theme.palette.background1};
  border: 1px solid ${({ theme }) => theme.palette.background5};
  z-index: 200;
  box-shadow: ${({ theme }) => `rgb(0 0 0 / 25%) 0px ${theme.px.xsmall} ${theme.px.xsmall}`};
  top: ${({ theme }) => `-${theme.px.xxlarge}`};
  opacity: 0;
  pointer-events: none;
  padding: ${({ theme }) => `${theme.px.xsmall} ${theme.px.small}`};
  overflow: hidden;
`;
const Container = styled.div<{ selected: boolean; transparent: boolean }>`
  height: ${({ theme }) => theme.px.xxlarge};
  min-width: ${({ theme }) => theme.px.xxlarge};
  padding: ${({ theme }) => theme.px.xsmall};
  display: flex;
  margin-right: ${({ theme }) => theme.px.small};
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.radius.small};
  &:hover ${Tooltip} {
    opacity: 1;
  }
  ${({ transparent, selected }) =>
    !transparent &&
    css`
      background-color: ${({ theme }) => (selected ? theme.palette.brandPrimary : theme.palette.background5)};
      &:hover {
        background-color: ${({ theme }) => theme.palette.brandPrimaryHover};
      }
      &:active {
        background-color: ${({ theme }) => theme.palette.brandPrimaryActive};
      }
    `}
`;
