import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from 'redux-saga'
import { devToolsEnhancer } from 'redux-devtools-extension';
import initialState from './initialState'
import runes from './reducers/runes'
import '../node_modules/bootswatch/dist/darkly/bootstrap.min.css'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    runes, initialState, 
    compose(
        applyMiddleware(sagaMiddleware), 
        devToolsEnhancer({}))
)

sagaMiddleware.run(rootSaga)    

ReactDOM.render(<App store={store} />, 
                document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
