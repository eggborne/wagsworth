import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import { TouchHandler } from './control';
import * as serviceWorker from './serviceWorker';
require('console-green');

// const touchHandler = new TouchHandler();
// touchHandler.setInputs();

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
