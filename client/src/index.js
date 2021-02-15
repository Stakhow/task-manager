import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import store from "./redux";
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';

const theme = createMuiTheme({});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
