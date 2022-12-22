import React, { useCallback } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import store, { persistor } from "./src/redux/store";
import ChildId from "./src/ChildID";
import { StatusBar } from "expo-status-bar";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Segoe-UI": require("./src/assets/fonts/SegoeUI.ttf"),
    "SegoeUI-SemiBold": require("./src/assets/fonts/SegoeUI-SemiBold.ttf"),
    "SegoeUI-Italic": require("./src/assets/fonts/SegoeUI-Italic.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  onLayoutRootView();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar barStyle="dark-content" animated={true} backgroundColor="#FFFFFF"/>
        <ChildId />
      </PersistGate>
    </Provider>
  );
}
