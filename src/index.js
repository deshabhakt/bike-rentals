import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './store/store';

import App from './App';

import './index.css';
import { KEY_USER_AUTH_TOKEN, KEY_USER_DATA, KEY_USER_LOGIN_STATE } from './utils/macros/generalMacros';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);