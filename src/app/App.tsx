import * as React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { ThemeProvider, Mixins, Typography } from '@openfin/ui-library';
import { Header } from './components/Header/Header';
import { ActionMenu } from './components/Menu/ActionMenu';
import { Label } from './components/Label/Label';
import { List } from './components/ProcessList/List';
import { CubeIcon } from '@modulz/radix-icons';
import { useProcessPoll } from './hooks/useProcessPoll';
import { Modal } from './components/Modal/Modal';
import { selectModal } from './store/slices/modal';
import { useSelector } from 'react-redux';

export const App: React.FC = () => {
  const [version, setVersion] = React.useState('0.0.0.0');
  const processPoll = useProcessPoll();
  const modal = useSelector(selectModal);

  React.useEffect(() => {
    fin.System.getRvmInfo().then((info) => {
      setVersion(info.version);
    });
  }, []);

  return (
    <ThemeProvider scheme="dark">
      <GlobalStyle />
      <Container>
        <Header title={'OpenFin Process Manager'} />
        <Body>
          <TopBar>
            <ActionMenu />
            <VersionLabel text={`RVM Version: ${version}`}>
              <CubeIcon />
            </VersionLabel>
          </TopBar>
          <ListContainer>
            <List applications={processPoll} />
            {modal && <Modal modal={modal} />}
          </ListContainer>
        </Body>
      </Container>
    </ThemeProvider>
  );
};

const Container = styled.div`
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
    border-radius: ${({ theme }) => theme.radius.base};
  }
  &,
  * {
    ${Mixins.scrollbar.base}
  }
`;
const TopBar = styled.div`
  display: flex;
  margin: ${({ theme }) => `0 ${theme.px.base} ${theme.px.small} ${theme.px.base}`};
`;
const VersionLabel = styled(Label)`
  margin-left: auto;
`;
const ListContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: ${({ theme }) => theme.palette.background1};
  border-radius: ${({ theme }) => theme.radius.base};
  overflow-y: auto;
  overflow-x: hidden;
  border: 1px solid ${({ theme }) => theme.palette.background5};
  box-shadow: ${({ theme }) => `rgb(0 0 0 / 25%) 0px ${theme.px.xsmall} ${theme.px.xsmall}`};
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  height: ${({ theme }) => `calc(100% - ${theme.px.xxxxlarge})`};
  padding: ${({ theme }) => `${theme.px.base}`};
`;
const GlobalStyle = createGlobalStyle`
  body {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    font: ${Typography.base};
    color: ${({ theme }) => theme.palette.textDefault};
    background-color: ${({ theme }) => theme.palette.background2};
    caret-color: ${({ theme }) => theme.palette.textDefault};
    user-select: none;
  }
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  &, * {
    ${Mixins.scrollbar.base}
  }
`;
