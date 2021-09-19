import React from "react";

import colors from "../../constants/colors";
import OrderRow from "../order-row";

import { StyleSheet, View } from "react-native";
import { sumBy } from "lodash";

interface OrderChartProps {
  data: number[][];
  maxTotalSum: number;
}

const OrderAskChart = (props: OrderChartProps): React.ReactElement => {
  const totalSum = sumBy(props.data, function (order: number[]) {
    return order[1];
  });
  let currTotal = totalSum;

  return (
    <View style={styles.orderChartContainer}>
      {props.data.map((order: any) => {
        const total = currTotal;
        currTotal -= order[1];
        const priceText = order[0].toLocaleString("en-US", {
          minimumFractionDigits: 1,
        });
        const totalPercentage = (total / props.maxTotalSum) * 100;

        return (
          <OrderRow
            key={order[0]}
            priceText={priceText}
            sizeText={order[1].toLocaleString()}
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

const styles = StyleSheet.create({
  orderChartContainer: {
    flex: 1,
    width: "100%",
  },
});

export default OrderAskChart;
