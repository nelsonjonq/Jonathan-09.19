import React from "react";

import colors from "../../../constants/colors";

import { StyleSheet, Text, View } from "react-native";

interface OrderRowProps {
  priceText: string;
  sizeText: string;
  totalText: string;
  totalPercentage: number;
  priceTextColor: string;
  backgroundColor: string;
}

const OrderRow = (props: OrderRowProps): React.ReactElement => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.rowColorContainer,
          {
            width: `${props.totalPercentage}%`,
            backgroundColor: props.backgroundColor,
          },
        ]}
      />
      <View style={styles.textContainer}>
        <Text style={[styles.priceText, { color: props.priceTextColor }]}>
          {props.priceText}
        </Text>
        <Text style={styles.primaryText}>{props.sizeText}</Text>
        <Text style={styles.primaryText}>{props.totalText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 3,
  },
  rowColorContainer: {
    position: "absolute",
    height: 24,
  },
  orderChartContainer: {
    flex: 1,
    width: "100%",
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  priceText: {
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
});

export default OrderRow;
