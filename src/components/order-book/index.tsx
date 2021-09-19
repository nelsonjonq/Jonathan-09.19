import React from "react";

import colors from "../../constants/colors";

import OrderBookHeader from "../header";
import OrderChart from "../ask-chart";
import OrderBidChart from "../bid-chart";
import SpreadRow from "../spread";
import ToggleProductButton from "../toggle-product-button";
import WebSocketConnection from "../../websocket";

import { ScrollView, StyleSheet, Text, SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import {
  calculateSpreadInUnits,
  calculateSpreadPercentage,
  calculateMaxTotalSum,
} from "../../helpers";

interface OrderBookProps {
  websocket: WebSocketConnection;
}

const NUM_ROWS = 12;

const OrderBook = (props: OrderBookProps): React.ReactElement => {
  let currAskArr = useSelector((state: any) => {
    const currentProductId = props.websocket.currentProductId;
    return state.orders.productIdToOrderBook[currentProductId].asks;
  });
  currAskArr = currAskArr?.slice(currAskArr.length - NUM_ROWS);

  const currBidArr = useSelector((state: any) => {
    const currentProductId = props.websocket.currentProductId;
    return state.orders.productIdToOrderBook[currentProductId].bids;
  })?.slice(0, NUM_ROWS);

  const spreadUnits = calculateSpreadInUnits(currAskArr, currBidArr);
  const spreadPercentage = calculateSpreadPercentage(currAskArr, currBidArr);
  const maxTotalSum = calculateMaxTotalSum(currAskArr, currBidArr);

  const onToggleProductId = () => {
    props.websocket.onToggleProductId();
  };

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <OrderBookHeader />
        <OrderChart data={currAskArr} maxTotalSum={maxTotalSum} />
        <SpreadRow units={spreadUnits} percentage={spreadPercentage} />
        <OrderBidChart data={currBidArr} maxTotalSum={maxTotalSum} />
        <ToggleProductButton onToggle={onToggleProductId} />
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  text: {
    color: colors.primaryText,
  },
});

export default OrderBook;
