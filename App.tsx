import React from 'react';
import AppLayout from './src/AppLayout';
import { Provider } from 'react-redux';
import { store } from './src/store';

export default function App() {
  return (
    <Provider store={store}>
      <AppLayout />
    </Provider>
  );
}
