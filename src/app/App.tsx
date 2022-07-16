import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ThemeProvider, Mixins, Icon, Box } from '@openfin/ui-library';
import { Header } from './components/Header/Header';
import { ActionMenu } from './components/Menu/ActionMenu';
import { Label } from './components/Label/Label';
import { List } from './components/ProcessList/List';
import { useProcessPoll } from './hooks/useProcessPoll';
import { Modal } from './components/Modal/Modal';
import { selectModal } from './store/slices/modal';
import { useSelector } from 'react-redux';
import { GlobalStyle } from './utils/globalStyle';

export const App: FC = () => {
    const [version, setVersion] = useState('0.0.0.0');
    const processPoll = useProcessPoll();
    const modal = useSelector(selectModal);

    useEffect(() => {
        fin.System.getRvmInfo().then((info) => {
            setVersion(info.version);
        });
    }, []);

    return (
        <ThemeProvider scheme="dark">
            <GlobalStyle />
            <Container>
                <Header title={'OpenFin Process Manager'}>
                    <VersionLabel text={`RVM Version: ${version}`}>
                        <Icon icon={'CubeIcon'} />
                    </VersionLabel>
                    <Separator />
                    <ActionMenu />
                </Header>
                <Body>
                    <Content>
                        <ListContainer>
                            <List applications={processPoll} />
                        </ListContainer>
                        {modal && <Modal modal={modal} />}
                    </Content>
                </Body>
            </Container>
        </ThemeProvider>
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
const Separator = styled(Box)`
    border-right: 1px ${({ theme }) => theme.palette.background4} solid;
    height: ${({ theme }) => theme.px.xxlarge};
    margin: ${({ theme }) => `0 ${theme.px.small} 0 ${theme.px.large}`};
`;
const VersionLabel = styled(Label)`
    -webkit-app-region: drag;
    margin-left: auto;
`;
const Content = styled(Box)`
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: ${({ theme }) => theme.palette.background1};
    border-radius: ${({ theme }) => theme.radius.base};
    box-shadow: ${({ theme }) => `rgb(0 0 0 / 25%) 0px ${theme.px.xsmall} ${theme.px.xsmall}`};
    border: 1px solid ${({ theme }) => theme.palette.background5};
    overflow-y: hidden;
    overflow-x: hidden;
`;
const ListContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
`;
const Body = styled(Box)`
    display: flex;
    flex-direction: column;
    height: ${({ theme }) => `calc(100% - ${theme.px.xxxlarge} - ${theme.px.small})`};
    margin: ${({ theme }) => `0 ${theme.px.small} ${theme.px.small} ${theme.px.small}`};
`;
