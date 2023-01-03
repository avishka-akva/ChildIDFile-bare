import React, { useCallback, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as LocalAuthentication from "expo-local-authentication";
import { MenuProvider } from "react-native-popup-menu";

import store, { persistor } from "./src/redux/store";
import ChildId from "./src/ChildID";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Segoe-UI": require("./src/assets/fonts/SegoeUI.ttf"),
    "SegoeUI-SemiBold": require("./src/assets/fonts/SegoeUI-SemiBold.ttf"),
    "SegoeUI-Italic": require("./src/assets/fonts/SegoeUI-Italic.ttf"),
  });

  const [localAuth, setLocalAuth] = useState(false);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && localAuth) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, localAuth]);

  onLayoutRootView();

  useEffect(() => {
    async function authenticate() {
      const result = await LocalAuthentication.authenticateAsync();
      if (result.success) {
        setLocalAuth(true);
      }
    }

    authenticate();
  }, []);

  if (!fontsLoaded || !localAuth) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MenuProvider>
          <ChildId />
        </MenuProvider>
      </PersistGate>
    </Provider>
  );
}
