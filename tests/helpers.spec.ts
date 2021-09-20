import "jest-enzyme";

import products from "../src/constants/products";

import {
  calculateSpreadInUnits,
  calculateSpreadPercentage,
  toggleProductId,
} from "../src/helpers";

const getMockedAskData = () => {
  return [
    [56000, 500],
    [55500, 300],
    [50000, 100],
  ];
};

const getMockedBidData = () => {
  return [
    [45000, 100],
    [44950, 200],
    [44900, 650],
  ];
};

const askOrderArr = getMockedAskData();
const bidOrderArr = getMockedBidData();

const spread = 5000;
const spreadPercentage = 10;

describe("calculateSpreadInUnits", () => {
  it("should calculate spread correctly ", () => {
    expect(calculateSpreadInUnits(askOrderArr, bidOrderArr)).toEqual(spread);
  });
});

describe("calculateSpreadPercentage", () => {
  it("should calculate spread percentage correctly ", () => {
    expect(calculateSpreadPercentage(askOrderArr, bidOrderArr)).toEqual(
      spreadPercentage,
    );
  });
});

describe("toggleProductId", () => {
  it("should toggle to bitcoin correctly", () => {
    expect(toggleProductId(products.ethereum)).toEqual(products.bitcoin);
  });

  it("should toggle to ethereum correctly", () => {
    expect(toggleProductId(products.bitcoin)).toEqual(products.ethereum);
  });
});
