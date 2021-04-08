import { helloWorld } from 'api';
import * as React from 'react';
import Styles from './app.module.scss';
import { TitleBar } from './components/title-bar';

export const App: React.FC = () => {
  return (
    <div className={Styles.app}>
      <TitleBar title="OpenFin App"></TitleBar>
      <div className={Styles.content}>
        <p>{helloWorld()}</p>
      </div>
    </div>
  );
};
