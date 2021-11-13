import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './app/App';

if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(React.createElement(App), document.getElementById('app'));
