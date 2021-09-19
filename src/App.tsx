import React from "react";

import { store } from "./redux/store";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";

import OrderBook from "./components/order-book";
import WebSocketConnection from "./services/websocket";

const websocket = new WebSocketConnection();

export default function App(): React.ReactElement {
  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <OrderBook websocket={websocket} />
    </Provider>
  );
}
