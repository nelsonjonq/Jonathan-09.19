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
    this.ws.onopen = this.subscribeToProduct;
    this.ws.onmessage = this.onMessageReceived;
  };

  onMessageReceived = (event: MessageEvent) => {
    const eventData = JSON.parse(event.data);
    if (eventData.event === "unsubscribed") {
      store.dispatch(unsubscribeFromProductId(this.currentProductId));
    } else {
      store.dispatch(receiveMessage(event));
    }
  };

  subscribeToProduct = () => {
    const initialMessage = {
      event: "subscribe",
      feed: "book_ui_1",
      product_ids: [this.currentProductId],
    };
    this.ws.send(JSON.stringify(initialMessage));
  };

  unsubscribeFromProduct = () => {
    const message = {
      event: "unsubscribe",
      feed: "book_ui_1",
      product_ids: [this.currentProductId],
    };
    this.ws.send(JSON.stringify(message));
  };

  onToggleProductId = () => {
    this.unsubscribeFromProduct();
    this.currentProductId = toggleProductId(this.currentProductId);
    this.subscribeToProduct();
  };
}

export default WebSocketConnection;
