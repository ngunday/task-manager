import React from 'react';
import styled, { css } from 'styled-components';

export interface BaseButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    action?: () => void;
    tooltip?: string;
    active?: boolean;
    transparent?: boolean;
    large?: boolean;
}

export const BaseButton: React.FC<BaseButtonProps> = ({
    action,
    tooltip,
    large = false,
    active = false,
    transparent = false,
    children,
    ...rest
}) => {
    const handleClick = (actionCb?: () => void) => (event: React.MouseEvent) => {
        event.stopPropagation();
        event.preventDefault();
        actionCb && actionCb();
    };

    return (
        <Container
            onClick={handleClick(action)}
            selected={active}
            transparent={transparent}
            large={large}
            title={tooltip}
            {...rest}
        >
            {children}
        </Container>
    );
};

const Container = styled.button<{ selected: boolean; transparent: boolean; large: boolean }>`
    background-color: transparent;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px;
    border: 0;
    margin: 0;
    padding: 0;

    height: ${({ theme, large }) => (large ? theme.px.xxxlarge : theme.px.xxlarge)};
    min-width: ${({ theme, large }) => (large ? theme.px.xxxlarge : theme.px.xxlarge)};
    padding: ${({ theme }) => theme.px.xsmall};
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    border-radius: ${({ theme }) => theme.radius.small};
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
