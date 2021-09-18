import React from "react";

import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const OrderBook = (): React.ReactElement => {
  const state = useSelector((state) => state);

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(state)}</Text>
    </View>
  );
};

export default OrderBook;
