import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RouterApp } from './app/App';

if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(React.createElement(RouterApp), document.getElementById('app'));
