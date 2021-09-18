import initialState from "../constants/initial-state";

import { RECEIVE_MESSAGE } from "../constants/action-types";
import { findIndex, remove, orderBy } from "lodash";

const orderReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case RECEIVE_MESSAGE:
      return receiveMessage(state, action);
    default:
      return state;
  }
};

const mergeSortedArrays = (
  arr: any,
  prevArr: any,
  sortBy: boolean | "asc" | "desc",
) => {
  for (const order of arr) {
    const orderPrice = order[0];

    // Find element to Update in Sorted Array
    const prevIndex = findIndex(prevArr, function (o: number[]) {
      return o[0] == orderPrice;
    });

    if (prevIndex != -1) {
      prevArr[prevIndex] = order;
    } else {
      prevArr.push(order);
    }
  }

  // Remove all Prices with Zero Contracts
  remove(prevArr, function (o: number[]) {
    return o[1] == 0;
  });

  // Sort in Ascending Order
  prevArr = orderBy(
    prevArr,
    function (o: number[]) {
      return o[0];
    },
    [sortBy],
  );

  return prevArr;
};

const receiveMessage = (state: any, action: any) => {
  const data = JSON.parse(action.payload.data);
  const productId = data.product_id;

  const asks = data.asks;
  const bids = data.bids;

  if (!productId) {
    return state;
  }

  const prevAsks = state.productIdToOrderBook[productId].asks;
  const prevBids = state.productIdToOrderBook[productId].bids;

  return {
    ...state,
    productIdToOrderBook: {
      ...state.productIdToOrderBook,
      [productId]: {
        asks: mergeSortedArrays(asks, prevAsks, "asc"),
        bids: mergeSortedArrays(bids, prevBids, "desc"),
      },
    },
  };
};

export default orderReducer;
