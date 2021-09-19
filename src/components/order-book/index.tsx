import React from "react";

import colors from "../../constants/colors";

import WebSocketConnection from "../../services/websocket";
import OrderBookHeader from "../header";
import SpreadRow from "../spread";
import OrderChart from "../chart";

import { ScrollView, StyleSheet, Text, SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import {
  calculateSpreadInUnits,
  calculateSpreadPercentage,
} from "../../helpers/spread-helper";

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

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <OrderBookHeader />
        <OrderChart data={currAskArr} isBidding={false} />
        <SpreadRow units={spreadUnits} percentage={spreadPercentage} />
        <OrderChart data={currBidArr} isBidding={true} />
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
