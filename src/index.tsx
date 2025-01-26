import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './feature/store.ts';
import {
    ChakraProvider,
} from "@chakra-ui/react";
import AppTheme from './theme.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
      <ChakraProvider theme={AppTheme}>
        <Provider store={store}>
          <App/>
        </Provider>
      </ChakraProvider>
    </BrowserRouter>
);


