import React from 'react';
import {StatusBar} from 'react-native';
import {CartContextProvider} from './src/contexts/CartContext';

import Routes from './src/routes';

import colors from './src/styles/colors';

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <CartContextProvider>
        <Routes />
      </CartContextProvider>
    </>
  );
}
