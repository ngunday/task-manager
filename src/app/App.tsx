import * as React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { ThemeProvider, Mixins, Typography } from '@openfin/ui-library';
import { Header } from './components/Header/Header';
import { TabGroup, TabInfo } from './components/Tab/TabGroup';
import { Workspace } from './pages/Workspace';
import { Applications } from './pages/Applications';
import { CubeIcon } from '@modulz/radix-icons';

const tabs = [{ title: 'applications' }, { title: 'workspace' }];

const App: React.FC = () => {
  const [version, setVersion] = React.useState('0.0.0.0');

  React.useEffect(() => {
    fin.System.getRvmInfo().then((info) => {
      setVersion(info.version);
    });
  }, []);

  const navigate = useNavigate();
  const handleNavigate = (tab: TabInfo) => {
    navigate(tab.title);
  };

  return (
    <Provider store={store}>
      <ThemeProvider scheme="dark">
        <GlobalStyle />
        <Container>
          <Header title={'Process Manager'} />
          <Body>
            <VersionContainer>
              <CubeIcon />
              <Version> {`RVM Version: ${version}`} </Version>
            </VersionContainer>
            {/* <TabGroup tabs={tabs} onChange={handleNavigate}></TabGroup> */}
            <PageContainer>
              <Routes>
                <Route path="/" element={<Applications />} />
                <Route path="/applications" element={<Applications />} />
                <Route path="/workspace" element={<Workspace />} />
              </Routes>
            </PageContainer>
          </Body>
        </Container>
      </ThemeProvider>
    </Provider>
  );
};

export const RouterApp: React.FC = () => (
  <Router>
    <App />
  </Router>
);

const Container = styled.div`
  background: ${({ theme }) => theme.palette.background2};
  width: 100%;
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
const VersionContainer = styled.div`
  display: flex;
  align-items: center;
  margin: ${({ theme }) => `0 ${theme.px.large} ${theme.px.base} 0`};
  margin-left: auto;
`;
const Version = styled.span`
  margin-left: ${({ theme }) => theme.px.small};
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
