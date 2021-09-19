import React from "react";

import colors from "../../../constants/colors";
import OrderRow from "../order-row";

import { View } from "react-native";

interface OrderBidChartProps {
  data: number[][];
  maxTotalSum: number;
}

const OrderBidChart = (props: OrderBidChartProps): React.ReactElement => {
  let currTotal = 0;
  return (
    <View>
      {props.data.map((order: number[]) => {
        currTotal += order[1];
        const priceText = order[0].toLocaleString("en-US", {
          minimumFractionDigits: 1,
        });

        const totalPercentage = (currTotal / props.maxTotalSum) * 100;
        return (
          <OrderRow
            key={order[0]}
            priceText={priceText}
            sizeText={order[1].toLocaleString()}
            totalText={currTotal.toLocaleString()}
            totalPercentage={totalPercentage}
            priceTextColor={colors.purchaseText}
            backgroundColor={colors.purchaseBackground}
          />
        );
      })}
    </View>
  );
};

export default OrderBidChart;
