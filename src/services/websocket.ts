class WebSocketConnection {
  ws: WebSocket;
  constructor() {
    this.ws = new WebSocket("wss://www.cryptofacilities.com/ws/v1");
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
      product_ids: ["PI_XBTUSD"],
    };
    this.ws.send(JSON.stringify(initialMessage));
  };

  onMessageReceived = (event: any) => {
    console.log(event);
  };
}

export default WebSocketConnection;
