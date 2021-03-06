import React from "react";

import colors from "../../constants/colors";
import strings from "../../constants/strings";

import ErrorMessage from "../error-message";
import OrderBookHeader from "../header";
import OrderChart from "../charts/ask-chart";
import OrderBidChart from "../charts/bid-chart";
import SpreadRow from "../spread";
import ToggleProductButton from "../buttons/toggle-product-button";
import WebSocketConnection from "../../websocket";

import { ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import {
  calculateSpreadInUnits,
  calculateSpreadPercentage,
  calculateMaxTotalSum,
} from "../../helpers";
import {
  getCachedAskOrderArray,
  getCachedBidOrderArray,
} from "../../redux/selectors/order";
import configs from "../../constants/configs";

interface OrderBookProps {
  connected: boolean;
  websocket: WebSocketConnection;
}

const OrderBook = (props: OrderBookProps): React.ReactElement => {
  const currAskArr = useSelector((state) => {
    return getCachedAskOrderArray(
      state,
      props.websocket.currentProductId,
      configs.throttleMs,
    );
  });
  const currBidArr = useSelector((state) => {
    return getCachedBidOrderArray(
      state,
      props.websocket.currentProductId,
      configs.throttleMs,
    );
  });

  const spreadUnits = calculateSpreadInUnits(currAskArr, currBidArr);
  const spreadPercentage = calculateSpreadPercentage(currAskArr, currBidArr);
  const maxTotalSum = calculateMaxTotalSum(currAskArr, currBidArr);

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <OrderBookHeader />
        <ErrorMessage
          display={!props.connected}
          text={strings.disconnectedError}
        />
        {props.connected && (
          <>
            <OrderChart data={currAskArr} maxTotalSum={maxTotalSum} />
            <SpreadRow units={spreadUnits} percentage={spreadPercentage} />
            <OrderBidChart data={currBidArr} maxTotalSum={maxTotalSum} />
            <ToggleProductButton onToggle={props.websocket.onToggleProductId} />
          </>
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default OrderBook;
