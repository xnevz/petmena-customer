/**
 * @format
 */

import { AppRegistry } from 'react-native';
import React from 'react';
import allReducers from './src/reducers/index.js';
import { legacy_createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import { name as appName } from './app.json';

const store = legacy_createStore(allReducers);

const ReduxApp = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

AppRegistry.registerComponent(appName, () => ReduxApp);
