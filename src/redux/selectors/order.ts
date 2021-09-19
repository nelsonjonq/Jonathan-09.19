/**
 *
 * Jonathan Nelson
 *
 * This class caches the result of the computation of the ask/bid order arrays
 * in order to prevent excessive rerendering of the order-book chart.
 */

import configs from "../../constants/configs";

const NUM_ROWS = configs.numRows;
const THROTTLE_MS = configs.throttleMs;

let cachedAskArr: number[][];
let cachedBidArr: number[][];
let askArrLastUpdate: number;
let bidArrLastUpdate: number;

function getTimestamp(): number {
  const date = new Date();
  return date.getTime();
}

export function getCachedAskOrderArray(state: any, currentProductId: string) {
  const timestamp = getTimestamp();
  if (timestamp - askArrLastUpdate < THROTTLE_MS) {
    return cachedAskArr;
  }

  const askOrderArr = state.orders.productIdToOrderBook[currentProductId].asks;
  const slicedAskOrderArr = askOrderArr.slice(askOrderArr.length - NUM_ROWS);

  askArrLastUpdate = timestamp;
  cachedAskArr = slicedAskOrderArr;

  return slicedAskOrderArr;
}

export function getCachedBidOrderArray(state: any, currentProductId: string) {
  const timestamp = getTimestamp();
  if (timestamp - bidArrLastUpdate < THROTTLE_MS) {
    return cachedBidArr;
  }

  const bidOrderArr = state.orders.productIdToOrderBook[currentProductId].bids;
  const slicedBidOrderarr = bidOrderArr.slice(0, NUM_ROWS);

  bidArrLastUpdate = timestamp;
  cachedBidArr = slicedBidOrderarr;

  return slicedBidOrderarr;
}
