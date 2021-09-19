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

export function calculateMaxTotalSum(
  askArr: number[][],
  bidArr: number[][],
): number {
  const totalAskSum = sumBy(askArr, function (order: number[]) {
    return order[1];
  });
  const totalBidSum = sumBy(bidArr, function (order: number[]) {
    return order[1];
  });

  return Math.max(totalAskSum, totalBidSum);
}
