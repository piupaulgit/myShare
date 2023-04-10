import React from 'react';
import Providers from './navigation';
import { NativeBaseProvider } from "native-base";

function App(): JSX.Element {

  return (
    <NativeBaseProvider>
      <Providers/>
    </NativeBaseProvider>
  );
}

export default App;
