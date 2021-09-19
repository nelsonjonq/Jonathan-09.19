export function calculateSpreadInUnits(askArr, bidArr): number {
  if (!askArr.length || !bidArr.length) {
    return 0;
  }

  return askArr[askArr.length - 1][0] - bidArr[0][0];
}

export function calculateSpreadPercentage(askArr, bidArr): number {
  if (!askArr.length || !bidArr.length) {
    return 0;
  }

  const spreadInUnits = calculateSpreadInUnits(askArr, bidArr);
  return (spreadInUnits / askArr[askArr.length - 1][0]) * 100;
}
