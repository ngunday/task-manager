import { FC, HTMLAttributes } from 'react';
import styled from 'styled-components';

export const HeaderButton: FC<HTMLAttributes<HTMLButtonElement>> = ({ children, ...rest }) => {
    return <Container {...rest}>{children}</Container>;
};

const Container = styled.button`
    background-color: transparent;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px;
    border: 0;
    margin: 0;

    min-width: ${({ theme }) => theme.px.xxlarge};
    height: ${({ theme }) => theme.px.xxlarge};

    padding: ${({ theme }) => theme.px.xsmall};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${({ theme }) => theme.px.xsmall};
    cursor: pointer;
    &:hover {
        background-color: ${({ theme }) => theme.palette.background4};
    }
    &:active {
        background-color: ${({ theme }) => theme.palette.background5};
    }
`;
