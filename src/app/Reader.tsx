import { FC } from 'react';
import styled from 'styled-components';
import { Box, IconType, Mixins } from '@openfin/ui-library';
import { Header } from './components/Header/Header';

interface Props {
    title: string;
    content: string;
    icon?: IconType;
}

export const Reader: FC<Props> = ({ icon, title, content }) => {
    return (
        <Container>
            <Header icon={icon} title={title} />
            <Body>
                <CodeArea>{content}</CodeArea>
            </Body>
        </Container>
    );
};

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    background: ${({ theme }) => theme.palette.background2};
    width: 100vw;
    height: 100vh;
    &:after {
        position: absolute;
        content: '';
        pointer-events: none;
        top: 1px;
        left: 1px;
        right: 1px;
        bottom: 1px;
        box-shadow: 0 0 1px 1px ${({ theme }) => theme.palette.background4};
    }
    &,
    * {
        ${Mixins.scrollbar.base}
    }
`;
const Body = styled(Box)`
    &:before {
        content: '';
        background-image: url('openfin-icon.png');
        background-repeat: no-repeat;
        background-position: center;
        position: absolute;
        pointer-events: none;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        opacity: 0.05;
    }
    background-color: ${({ theme }) => theme.palette.background1};
    border-radius: ${({ theme }) => theme.radius.base};
    box-shadow: ${({ theme }) => `rgb(0 0 0 / 25%) 0px ${theme.px.xsmall} ${theme.px.xsmall}`};
    border: 1px solid ${({ theme }) => theme.palette.background5};
    overflow: auto auto;
    margin: ${({ theme }) => `0 ${theme.px.small} ${theme.px.small} ${theme.px.small}`};
    flex: 1;
`;
const CodeArea = styled.pre`
    user-select: text;
    white-space: pre-wrap;
    padding: ${({ theme }) => theme.px.small};
`;
