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
        const orderPrice = order[0];
        const orderTotal = order[1];

        currTotal += orderTotal;

        const totalPercentage = (currTotal / props.maxTotalSum) * 100;
        const priceText = orderPrice.toLocaleString("en-US", {
          minimumFractionDigits: 1,
        });

        return (
          <OrderRow
            key={orderPrice}
            priceText={priceText}
            sizeText={orderTotal.toLocaleString()}
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
