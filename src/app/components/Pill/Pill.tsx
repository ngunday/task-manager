import { Box, Icon } from '@openfin/ui-library';
import React from 'react';
import styled from 'styled-components';
import { Pill as PillData } from '../../model/UI';

type Props = React.HTMLAttributes<HTMLDivElement> & PillData;

export const Pill: React.FC<Props> = ({ icon, text, tooltip, ...rest }) => {
    return (
        <Container title={tooltip} {...rest}>
            <Icon icon={icon} size={'small'} />
            <PillText>{text}</PillText>
        </Container>
    );
};

const PillText = styled(Box)`
    display: flex;
    padding-left: ${({ theme }) => theme.px.xsmall};
    padding-top: 2px;
`;
const Container = styled(Box)`
    font-size: ${({ theme }) => theme.fontSize.small};
    border-radius: ${({ theme }) => theme.px.base};
    text-transform: capitalize;
    height: ${({ theme }) => theme.px.xxlarge};
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: ${({ theme }) => `0 ${theme.px.base} 0 0`};
    overflow-x: hidden;
    min-width: ${({ theme }) => theme.px.base};
`;
