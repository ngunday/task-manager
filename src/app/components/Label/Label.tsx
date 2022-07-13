import { Box } from '@openfin/ui-library';
import React from 'react';
import styled from 'styled-components';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    text: string;
}

export const Label: React.FC<Props> = ({ text, children, ...rest }) => {
    return (
        <Container {...rest}>
            {children}
            <LabelText> {text} </LabelText>
        </Container>
    );
};

const Container = styled(Box)`
    display: flex;
    align-items: center;
`;
const LabelText = styled.span`
    padding-left: ${({ theme }) => theme.px.xsmall};
`;
