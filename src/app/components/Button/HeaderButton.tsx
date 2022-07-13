import React from 'react';
import styled from 'styled-components';

export const HeaderButton: React.FC<React.HTMLAttributes<HTMLButtonElement>> = ({ children, ...rest }) => {
    return <Container {...rest}>{children}</Container>;
};

const Container = styled.button`
    background-color: transparent;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px;
    border: 0;
    margin: 0;
    padding: 0;

    padding: ${({ theme }) => theme.px.xsmall};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
        background-color: ${({ theme }) => theme.palette.background4};
    }
    &:active {
        background-color: ${({ theme }) => theme.palette.background5};
    }
`;
