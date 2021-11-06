import { StatusBar } from "expo-status-bar";
import { Root } from "native-base";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from 'react-redux';

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { store } from "./Redux/Reducers";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
    <Root>
      <Provider store={store}>
        <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </Provider>
    </Root>
    );
  }
}
