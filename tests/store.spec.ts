import "jest-enzyme";

import products from "../src/constants/products";
import initialState from "../src/redux/constants/initial-state";
import bitcoinDataMessage from "./mocks/messages/bitcoin-data";
import ethereumDataMessage from "./mocks/messages/ethereum-data";

import {
  getCachedAskOrderArray,
  getCachedBidOrderArray,
} from "../src/redux/selectors/order";
import { receiveMessage } from "../src/redux/actions/orders";

import { store } from "../src/redux/store";

const throttleTimeInMs = 0;
const getMockedBitcoinAskData = () => {
  return [
    [56000, 500],
    [55500, 300],
    [50000, 100],
  ];
};

const getMockedEthereumBidData = () => {
  return [
    [2700, 100],
    [2600, 200],
    [2500, 650],
  ];
};

describe("getCachedAskOrderArray", () => {
  it("initially bitcoin data should be empty", () => {
    expect(
      getCachedAskOrderArray(initialState, products.bitcoin, throttleTimeInMs),
    ).toEqual([]);
  });

  it("selector should correctly return bitcoin asks data from store", () => {
    // Dispatch a Sample Message to Redux with Bitcoin Data
    store.dispatch(receiveMessage(bitcoinDataMessage as MessageEvent));

    expect(
      getCachedAskOrderArray(initialState, products.bitcoin, throttleTimeInMs),
    ).toEqual(getMockedBitcoinAskData());
  });
});

describe("getCachedBidOrderArray", () => {
  it("initially ethereum data should be empty", () => {
    expect(
      getCachedBidOrderArray(initialState, products.ethereum, throttleTimeInMs),
    ).toEqual([]);
  });

  it("selector should correctly return ethereum bids data from store", () => {
    // Dispatch a Sample Message to Redux with Ethereum Data
    store.dispatch(receiveMessage(ethereumDataMessage as MessageEvent));

    expect(
      getCachedBidOrderArray(initialState, products.ethereum, throttleTimeInMs),
    ).toEqual(getMockedEthereumBidData());
  });
});
