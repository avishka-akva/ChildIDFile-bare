import React, { useEffect, useState, useRef } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as LocalAuthentication from "expo-local-authentication";
import { MenuProvider } from "react-native-popup-menu";
import { AppState } from "react-native";

import store, { persistor } from "./src/redux/store";
import ChildId from "./src/ChildID";
import Auth from "./src/screens/Auth";
import { LOADING_TIME } from "./src/shared/const";

SplashScreen.preventAutoHideAsync();

let timeoutId = null;

export default function App() {
  const [fontsLoaded] = useFonts({
    "Segoe-UI": require("./src/assets/fonts/SegoeUI.ttf"),
    "SegoeUI-SemiBold": require("./src/assets/fonts/SegoeUI-SemiBold.ttf"),
    "SegoeUI-Italic": require("./src/assets/fonts/SegoeUI-Italic.ttf"),
  });

  const [appLoaded, setAppLoaded] = useState(false);
  const [localAuth, setLocalAuth] = useState(false);
  const [securityLevel, setSecurityLevel] = useState(0);

  const appState = useRef(AppState.currentState);

  const authenticate = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync();
      if (result.success) {
        setLocalAuth(true);
      }
    } catch (error) {
      console.log("🚀 ~ file: App.js:39 ~ authenticate ~ error", error);
    }
  };

  const getAuthenticate = async () => {
    const _securityLevel = await LocalAuthentication.getEnrolledLevelAsync();

    if (_securityLevel === 0) {
      setLocalAuth(true);
    } else {
      setSecurityLevel(_securityLevel);
    }
  };

  useEffect(() => {
    if (fontsLoaded && appLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, appLoaded]);

  useEffect(() => {
    getAuthenticate();

    setTimeout(() => setAppLoaded(true), LOADING_TIME);

    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      }

      if (nextAppState === "background") {
        timeoutId = setTimeout(() => {
          setLocalAuth(false);
        }, 60000);
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  if (!localAuth) {
    return <Auth onAuthClick={authenticate} securityLevel={securityLevel} />;
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
