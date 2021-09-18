import initialState from "../constants/initial-state";

import { RECEIVE_MESSAGE } from "../constants/action-types";

const orderReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case RECEIVE_MESSAGE:
      return receiveMessage(state, action);
    default:
      return state;
  }
};

const receiveMessage = (state: any, action: any) => {
  const data = JSON.parse(action.payload.data);
  const productId = data.product_id;
  const asks = data.asks;
  const bids = data.bids;

  if (!productId) {
    return state;
  }

  return {
    ...state,
    productIdToOrderBook: {
      ...state.productIdToOrderBook,
      [productId]: {
        asks: asks,
        bids: bids,
      },
    },
  };
};

export default orderReducer;
