import { IconType, ThemeProvider } from '@openfin/ui-library';
import { render } from 'react-dom';
import { Reader } from '../Reader';
import { v4 as uuid } from 'uuid';
import { StyleSheetManager } from 'styled-components';
import { GlobalStyle } from './globalStyle';
import { WindowProvider } from './window';

const windowOptions: OpenFin.WindowCreationOptions = {
    name: '',
    defaultWidth: 800,
    defaultHeight: 600,
    defaultCentered: true,
    minWidth: 800,
    minHeight: 480,
    contextMenu: true,
    saveWindowState: true,
    waitForPageLoad: true,
    state: 'normal',
    url: 'viewer.html',
    frame: false,
};

export const launchReader = async (title: string, content: string, icon?: IconType) => {
    const window: OpenFin.Window = await fin.Window.create({ ...windowOptions, name: uuid() });
    const doc = window.getWebWindow().document;
    const target = doc.getElementById('root');
    render(
        <WindowProvider value={window}>
            <StyleSheetManager target={doc.head}>
                <ThemeProvider scheme="dark">
                    <GlobalStyle />
                    <Reader title={title} content={content} icon={icon} />
                </ThemeProvider>
            </StyleSheetManager>
        </WindowProvider>,
        target
    );
};
