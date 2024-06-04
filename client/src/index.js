import React from 'react'
import { createRoot } from 'react-dom/client'
import { createStore, applyMiddleware, compose} from 'redux'
import { Provider } from 'react-redux'
import { thunk } from 'redux-thunk'
import App from './App'
import { ThemeProvider } from '@mui/material'
import { theme } from './theme'
import reducers from './reducers'
import { BrowserRouter } from 'react-router-dom'
import "./index.css";
const root = createRoot(document.getElementById('root'));
const store = createStore(reducers, compose(applyMiddleware(thunk)))

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Provider store = {store}>
                    <App />
                </Provider>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
);