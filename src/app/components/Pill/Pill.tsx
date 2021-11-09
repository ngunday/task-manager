import React from 'react';
import styled, {css} from 'styled-components';
import { Pill as PillData } from '../../model/Shapes';

interface Props extends PillData {
  warning?: boolean;
  fixed?: boolean;
}

export const Pill: React.FC<Props> = (props: Props) => {
  const {icon, warning = false, text, fixed = false} = props;

  return (
    <Container fixed={fixed} warning={warning}>
      <Icon>
        {icon}
      </Icon>
      {text}
    </Container>
  );
}

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: ${({theme}) => theme.px.small};
`;

const Container = styled.div<{fixed: boolean, warning: boolean}>`
  background-color: ${({theme, warning}) => warning ? theme.palette.statusCritical : theme.palette.brandPrimary};
  border-radius: ${({theme}) => theme.px.xsmall};
  padding: ${({theme}) => `${theme.px.xsmall} ${theme.px.small}`};
  margin: ${({theme}) => `0 ${theme.px.small} 0 0`};
  text-transform: capitalize;
  height: ${({ theme }) => theme.px.xxlarge};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${({theme}) => `0 ${theme.px.base} 0 0`};
  ${({ fixed }) => fixed && css`
    width: 90px;
    min-width: 90px;
  `}
`;
