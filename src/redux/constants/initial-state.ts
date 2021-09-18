const initialState: any = {
  orders: {
    productIdToOrderBook: {
      PI_XBTUSD: {
        asks: [],
        bids: [],
        priceDetails: {},
      },
      PI_ETHUSD: {
        asks: [],
        bids: [],
        priceDetails: {},
      },
    },
  },
};

export default initialState;
