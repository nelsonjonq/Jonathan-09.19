import React from "react";

import colors from "../../constants/colors";
import strings from "../../constants/strings";

import { StyleSheet, Text, View } from "react-native";

interface OrderChartProps {
  data: any;
  isBidding: any;
}

const OrderChart = (props: OrderChartProps): React.ReactElement => {
  let total = 0;
  return (
    <View style={styles.orderChartContainer}>
      {props.data.map((order: any) => {
        total += order[1];
        return (
          <View key={order[0]} style={styles.rowContainer}>
            <Text style={styles.unitPriceText}>
              {order[0].toLocaleString()}
            </Text>
            <Text style={styles.primaryText}>{order[1]}</Text>
            <Text style={styles.primaryText}>{total}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  unitPriceText: {
    color: colors.primaryText,
    fontWeight: "bold",
    textAlign: "right",
    minWidth: 75,
  },
  primaryText: {
    color: colors.primaryText,
    fontWeight: "bold",
    textAlign: "right",
    minWidth: 75,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    margin: 5,
  },
  orderChartContainer: {},
});

export default OrderChart;
