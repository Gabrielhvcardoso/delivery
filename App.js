import React, { createContext, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Routes from './src/routes';
import Showcase from './src/components/Showcase';

import { GeneralContextProvider } from './src/context';

export default function App() {
  return (
    <GeneralContextProvider>
      <StatusBar style="auto" />
      <Showcase />
  
      <Routes />
    </GeneralContextProvider>
  );
}
