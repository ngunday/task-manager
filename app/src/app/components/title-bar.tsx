import { BoxIcon, CopyIcon, Cross1Icon, DividerHorizontalIcon } from '@modulz/radix-icons';
import * as React from 'react';
import Styles from './title-bar.module.scss';

interface TitleBarProps {
  title?: string;
}

export const TitleBar: React.FC<TitleBarProps> = (props) => {
  const [isMaximized, setIsMaximized] = React.useState(false);
  const win = fin && fin.Window.getCurrentSync();
  win?.on('maximized', () => {
    setIsMaximized(true);
  });
  win?.on('restored', () => {
    setIsMaximized(false);
  });

  const MaximizeButton = (
    <div className={Styles.maximize} onClick={() => win?.maximize()}>
      <div className={Styles.container}>
        <BoxIcon></BoxIcon>
      </div>
    </div>
  );
  const RestoreButton = (
    <div className={Styles.restore} onClick={() => win?.restore()}>
      <div className={Styles.container}>
        <CopyIcon></CopyIcon>
      </div>
    </div>
  );

  return (
    <div className={Styles.header}>
      <div className={Styles.title}>{props.title}</div>
      <div className={Styles.actions}>
        <div onClick={() => win?.minimize()}>
          <div className={Styles.container}>
            <DividerHorizontalIcon></DividerHorizontalIcon>
          </div>
        </div>
        {isMaximized ? RestoreButton : MaximizeButton}
        <div className={Styles.close} onClick={() => win?.close()}>
          <div className={Styles.container}>
            <Cross1Icon></Cross1Icon>
          </div>
        </div>
      </div>
    </div>
  );
};
