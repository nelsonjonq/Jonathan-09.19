import React, { useEffect, useState } from "react";

import { AppState, Alert } from "react-native";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { store } from "./redux/store";

import OrderBook from "./components/order-book";
import WebSocketConnection from "./websocket";
import strings from "./constants/strings";

const websocket = new WebSocketConnection();

export default function App(): React.ReactElement {
  const [connected, setConnected] = useState(true);

  const resubscribeToProduct = () => {
    websocket.subscribeToProduct();
    setConnected(true);
  };

  const alertUserOfResubscription = () => {
    Alert.alert(
      strings.reconnectToApp,
      "",
      [
        {
          text: strings.reconnect,
          onPress: resubscribeToProduct,
        },
      ],
      { cancelable: false },
    );
  };

  const handleAppStateChange = (appState: string) => {
    if (appState === "active") {
      alertUserOfResubscription();
    } else {
      websocket.unsubscribeFromProduct();
      setConnected(false);
    }
  };

  useEffect(() => {
    AppState.addEventListener("change", handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", handleAppStateChange);
    };
  }, []);

  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <OrderBook connected={connected} websocket={websocket} />
    </Provider>
  );
}
