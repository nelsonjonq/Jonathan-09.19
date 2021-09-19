import React from "react";

import colors from "../../constants/colors";
import strings from "../../constants/strings";

import { StyleSheet, Text, View } from "react-native";

const OrderBookHeader = (): React.ReactElement => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>{strings.orderBookHeader}</Text>
      </View>
      <View style={[styles.textContainer, styles.categoryHeaderContainer]}>
        <Text style={styles.categoryHeaderText}>
          {strings.priceHeader.toUpperCase()}
        </Text>
        <Text style={styles.categoryHeaderText}>
          {strings.sizeHeader.toUpperCase()}
        </Text>
        <Text style={styles.categoryHeaderText}>
          {strings.totalHeader.toUpperCase()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryHeaderText: {
    color: colors.grey,
    fontWeight: "bold",
  },
  categoryHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  container: {
    flex: 1,
  },
  headerText: {
    color: colors.primaryText,
    fontWeight: "bold",
  },
  textContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
    padding: 10,
    paddingLeft: 15,
  },
});

export default OrderBookHeader;
