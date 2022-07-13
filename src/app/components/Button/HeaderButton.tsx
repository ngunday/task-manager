import React from 'react';
import styled from 'styled-components';

type Props = React.HTMLAttributes<HTMLDivElement>;

export const HeaderButton: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;

    return <Container {...rest}>{children}</Container>;
};

const Container = styled.div`
    height: ${({ theme }) => theme.px.xlarge};
    width: ${({ theme }) => theme.px.xlarge};
    padding: ${({ theme }) => theme.px.xsmall};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    cursor: pointer;
    &:active {
        background-color: ${({ theme }) => theme.palette.background1};
    }
`;
