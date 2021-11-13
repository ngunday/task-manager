import * as React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Provider } from 'react-redux';
import store from './store/store';
import { ThemeProvider, Mixins, Typography } from '@openfin/ui-library';
import { Header } from './components/Header/Header';
import { Applications } from './pages/Applications';
import { CubeIcon } from '@modulz/radix-icons';
import { ActionMenu } from './components/Menu/ActionMenu';
import { Label } from './components/Label/Label';

export const App: React.FC = () => {
  const [version, setVersion] = React.useState('0.0.0.0');

  React.useEffect(() => {
    fin.System.getRvmInfo().then((info) => {
      setVersion(info.version);
    });
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider scheme="dark">
        <GlobalStyle />
        <Container>
          <Header title={'OpenFin Process Manager'} />
          <Body>
            <TopBar>
              <ActionMenu />
              <VersionLabel icon={<CubeIcon />} text={`RVM Version: ${version}`} />
            </TopBar>
            <PageContainer>
              <Applications />
            </PageContainer>
          </Body>
        </Container>
      </ThemeProvider>
    </Provider>
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
const PageContainer = styled.div`
  display: flex;
  flex: 1;
  overflow-y: auto;
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
