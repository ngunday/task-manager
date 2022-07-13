import React from 'react';
import styled from 'styled-components';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    text: string;
}

export const Label: React.FC<Props> = (props: Props) => {
    const { text, children, ...rest } = props;
    return (
        <Container {...rest}>
            {children}
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
