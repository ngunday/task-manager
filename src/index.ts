import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './app/App';

if (typeof fin === 'undefined') {
  window.location.href = 'https://developers.openfin.co/of-docs';
}

if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(React.createElement(App), document.getElementById('app'));
