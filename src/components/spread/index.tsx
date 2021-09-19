import React from "react";

import colors from "../../constants/colors";
import strings from "../../constants/strings";

import { StyleSheet, Text, View } from "react-native";

interface SpreadRowProps {
  units: number;
  percentage: number;
}

const SpreadRow = (props: SpreadRowProps): React.ReactElement => {
  const units = props.units.toFixed(1);
  const percentage = props.percentage.toFixed(2);
  const spreadText = `${strings.spreadHeader} ${units} (${percentage}%)`;

  return (
    <View style={styles.spreadTextContainer}>
      <Text style={styles.spreadText}>{spreadText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  spreadText: {
    color: colors.grey,
    fontWeight: "bold",
  },
  spreadTextContainer: {
    borderBottomColor: colors.grey,
    padding: 10,
    paddingLeft: 15,
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default SpreadRow;
