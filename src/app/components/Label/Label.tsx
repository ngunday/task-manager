import React from 'react';
import styled from 'styled-components';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  icon?: JSX.Element;
  text: string;
}

export const Label: React.FC<Props> = (props: Props) => {
  const { icon, text, ...rest } = props;
  return (
    <Container {...rest}>
      {icon}
      <LabelText> {text} </LabelText>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
`;
const LabelText = styled.span`
  padding-left: ${({ theme }) => theme.px.xsmall};
`;
