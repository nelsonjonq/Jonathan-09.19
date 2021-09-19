import {
  receiveMessage,
  unsubscribeFromProductId,
} from "../redux/actions/orders";
import { store } from "../redux/store";

class WebSocketConnection {
  ws: WebSocket;
  currentProductId: string;

  constructor() {
    this.ws = new WebSocket("wss://www.cryptofacilities.com/ws/v1");
    this.currentProductId = "PI_XBTUSD";
    this.configureConnection();
  }

  configureConnection = () => {
    this.ws.onopen = this.subscribeToProductId;
    this.ws.onmessage = this.onMessageReceived;
  };

  onMessageReceived = (event: any) => {
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
    if (this.currentProductId === "PI_XBTUSD") {
      this.currentProductId = "PI_ETHUSD";
    } else {
      this.currentProductId = "PI_XBTUSD";
    }
    this.subscribeToProductId();
  };
}

export default WebSocketConnection;
