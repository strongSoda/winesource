import React from 'react';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import AppRouter from 'components/AppRouter';
import ThemeProvider from 'components/ThemeProvider';
import GlobalStyles from 'global/themes/globalStyles';
import { store, persistor } from 'store';
import { HelmetProvider } from 'react-helmet-async';
import { PersistGate } from 'redux-persist/integration/react'

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <GlobalStyles />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppRouter />
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// Finish creating template -> https://alexgrischuk.medium.com/how-to-create-custom-create-react-app-cra-templates-73a5196edeb
// commitlint and husky?
