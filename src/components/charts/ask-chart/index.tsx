import React from "react";

import colors from "../../../constants/colors";
import OrderRow from "../order-row";

import { View } from "react-native";
import { calculateTotalSumOfOrderArr } from "../../../helpers";

interface OrderAskChartProps {
  data: number[][];
  maxTotalSum: number;
}

const OrderAskChart = (props: OrderAskChartProps): React.ReactElement => {
  let currTotal = calculateTotalSumOfOrderArr(props.data);
  return (
    <View>
      {props.data.map((order: number[]) => {
        const total = currTotal;
        const totalPercentage = (total / props.maxTotalSum) * 100;
        const orderPrice = order[0];
        const orderTotal = order[1];

        currTotal -= orderTotal;
        const priceText = order[0].toLocaleString("en-US", {
          minimumFractionDigits: 1,
        });

        return (
          <OrderRow
            key={orderPrice}
            priceText={priceText}
            sizeText={orderTotal.toLocaleString()}
            totalText={total.toLocaleString()}
            totalPercentage={totalPercentage}
            priceTextColor={colors.sellText}
            backgroundColor={colors.sellBackground}
          />
        );
      })}
    </View>
  );
};

export default OrderAskChart;
