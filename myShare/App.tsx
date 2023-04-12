import React from 'react';
import Providers from './navigation';
import { NativeBaseProvider } from "native-base";
import 'react-native-gesture-handler';

function App(): JSX.Element {

  return (
    <NativeBaseProvider>
      <Providers/>
    </NativeBaseProvider>
  );
}

export default App;
