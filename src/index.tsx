import { render } from 'react-dom';
import { App } from './app/App';
import { Provider } from 'react-redux';
import store from './app/store/store';
import { WindowProvider } from './app/utils/window';

if (typeof fin === 'undefined') {
    window.location.href = 'https://developers.openfin.co/of-docs';
}

if (module.hot) {
    module.hot.accept();
}

render(
    <Provider store={store}>
        <WindowProvider value={fin.Window.getCurrentSync()}>
            <App />
        </WindowProvider>
    </Provider>,
    document.getElementById('app')
);
