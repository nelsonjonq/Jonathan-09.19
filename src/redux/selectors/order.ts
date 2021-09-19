const NUM_ROWS = 12;

export function getAskOrderArray(state: any, currentProductId: string) {
  const askOrderArr = state.orders.productIdToOrderBook[currentProductId].asks;
  return askOrderArr.slice(askOrderArr.length - NUM_ROWS);
}

export function getBidOrderArray(state: any, currentProductId: string) {
  const askOrderArr = state.orders.productIdToOrderBook[currentProductId].bids;
  return askOrderArr.slice(0, NUM_ROWS);
}
