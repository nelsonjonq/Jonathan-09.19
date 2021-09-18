import { receiveMessage } from "../redux/actions/message";
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
    this.ws.onopen = this.onOpenWebsocket;
    this.ws.onmessage = this.onMessageReceived;
  };

  onOpenWebsocket = () => {
    const initialMessage = {
      event: "subscribe",
      feed: "book_ui_1",
      product_ids: [this.currentProductId],
    };
    this.ws.send(JSON.stringify(initialMessage));
  };

  onMessageReceived = (event: any) => {
    store.dispatch(receiveMessage(event));
  };
}

export default WebSocketConnection;
