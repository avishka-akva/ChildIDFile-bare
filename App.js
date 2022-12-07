import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import ChildId from "./src/ChildID"

export default function App() {
  return (
    <Provider store={store}>
      <ChildId />
    </Provider>
  );
}
