import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import store, { persistor } from "./src/redux/store";
import ChildId from "./src/ChildID";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChildId />
      </PersistGate>
    </Provider>
  );
}
