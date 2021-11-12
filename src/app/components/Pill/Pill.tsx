import React from 'react';
import styled from 'styled-components';
import { Pill as PillData } from '../../model/Shapes';

type Props = React.HTMLAttributes<HTMLDivElement> & PillData;

export const Pill: React.FC<Props> = (props: Props) => {
  const { icon, text } = props;

  return (
    <Container {...props}>
      <Icon>{icon}</Icon>
      {text}
    </Container>
  );
};

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: ${({ theme }) => theme.px.xsmall};
  width: ${({ theme }) => theme.px.large};
`;
const Container = styled.div`
  font-size: ${({ theme }) => theme.fontSize.small};
  border-radius: ${({ theme }) => theme.px.base};
  text-transform: capitalize;
  height: ${({ theme }) => theme.px.xxlarge};
  display: flex;
  align-items: center;
  margin: ${({ theme }) => `0 ${theme.px.base} 0 0`};
  overflow-x: hidden;
  justify-content: flex-start;
  min-width: ${({ theme }) => theme.px.base};
`;
