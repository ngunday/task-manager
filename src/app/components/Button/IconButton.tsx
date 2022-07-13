import React from 'react';
import styled, { css } from 'styled-components';
import { Z_INDEX_MENU } from '../../constants';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    action?: () => void;
    tooltip?: string;
    active?: boolean;
    transparent?: boolean;
    large?: boolean;
}

export const IconButton: React.FC<Props> = (props: Props) => {
    const { action, tooltip, large = false, active = false, transparent = false, children, ...rest } = props;

    const handleClick = (actionCb?: () => void) => (event: React.MouseEvent) => {
        event.stopPropagation();
        event.preventDefault();
        actionCb && actionCb();
    };

    return (
        <Container onClick={handleClick(action)} selected={active} transparent={transparent} large={large} {...rest}>
            {children}
            {tooltip && <Tooltip>{tooltip}</Tooltip>}
        </Container>
    );
};

const Tooltip = styled.div`
    position: absolute;
    transition: opacity ${({ theme }) => theme.transition.base};
    background-color: ${({ theme }) => theme.palette.background1};
    border: 1px solid ${({ theme }) => theme.palette.background5};
    z-index: ${Z_INDEX_MENU};
    box-shadow: ${({ theme }) => `rgb(0 0 0 / 25%) 0px ${theme.px.xsmall} ${theme.px.xsmall}`};
    bottom: ${({ theme }) => `${theme.unit.xxxlarge + theme.unit.small}px`};
    opacity: 0;
    pointer-events: none;
    padding: ${({ theme }) => `${theme.px.xsmall} ${theme.px.small}`};
    overflow: hidden;
`;
const Container = styled.div<{ selected: boolean; transparent: boolean; large: boolean }>`
    height: ${({ theme, large }) => (large ? theme.px.xxxlarge : theme.px.xxlarge)};
    min-width: ${({ theme, large }) => (large ? theme.px.xxxlarge : theme.px.xxlarge)};
    padding: ${({ theme }) => theme.px.xsmall};
    display: flex;
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
