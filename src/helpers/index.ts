import products from "../constants/products";
import { sumBy } from "lodash";

export function calculateSpreadInUnits(
  askArr: number[][],
  bidArr: number[][],
): number {
  if (!askArr.length || !bidArr.length) {
    return 0;
  }

  return askArr[askArr.length - 1][0] - bidArr[0][0];
}

export function calculateSpreadPercentage(
  askArr: number[][],
  bidArr: number[][],
): number {
  if (!askArr.length || !bidArr.length) {
    return 0;
  }

  const spreadInUnits = calculateSpreadInUnits(askArr, bidArr);
  return (spreadInUnits / askArr[askArr.length - 1][0]) * 100;
}

export function calculateTotalSumOfOrderArr(orderArr: number[][]): number {
  return sumBy(orderArr, function (order: number[]) {
    return order[1];
  });
}

export function calculateMaxTotalSum(
  askArr: number[][],
  bidArr: number[][],
): number {
  const totalAskSum = calculateTotalSumOfOrderArr(askArr);
  const totalBidSum = calculateTotalSumOfOrderArr(bidArr);

  return Math.max(totalAskSum, totalBidSum);
}

export function toggleProductId(productId: string): string {
  if (productId === products.bitcoin) {
    return products.ethereum;
  } else {
    return products.bitcoin;
  }
}
