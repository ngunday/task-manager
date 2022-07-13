import { render } from 'react-dom';
import { App } from './app/App';
import { Provider } from 'react-redux';
import store from './app/store/store';

if (typeof fin === 'undefined') {
    window.location.href = 'https://developers.openfin.co/of-docs';
}

if (module.hot) {
    module.hot.accept();
}

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
