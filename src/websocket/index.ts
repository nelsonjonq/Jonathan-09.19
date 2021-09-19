import products from "../constants/products";

import {
  receiveMessage,
  unsubscribeFromProductId,
} from "../redux/actions/orders";
import { store } from "../redux/store";
import { toggleProductId } from "../helpers";

class WebSocketConnection {
  ws: WebSocket;
  currentProductId: string;

  constructor() {
    this.ws = new WebSocket("wss://www.cryptofacilities.com/ws/v1");
    this.currentProductId = products.bitcoin;
    this.configureConnection();
  }

  configureConnection = () => {
    this.ws.onopen = this.subscribeToProductId;
    this.ws.onmessage = this.onMessageReceived;
  };

  onMessageReceived = (event: MessageEvent) => {
    store.dispatch(receiveMessage(event));
  };

  subscribeToProductId = () => {
    const initialMessage = {
      event: "subscribe",
      feed: "book_ui_1",
      product_ids: [this.currentProductId],
    };
    this.ws.send(JSON.stringify(initialMessage));
  };

  unsubscribeFromProductId = () => {
    const message = {
      event: "unsubscribe",
      feed: "book_ui_1",
      product_ids: [this.currentProductId],
    };
    this.ws.send(JSON.stringify(message));
    store.dispatch(unsubscribeFromProductId(this.currentProductId));
  };

  onToggleProductId = () => {
    this.unsubscribeFromProductId();
    this.currentProductId = toggleProductId(this.currentProductId);
    this.subscribeToProductId();
  };
}

export default WebSocketConnection;
