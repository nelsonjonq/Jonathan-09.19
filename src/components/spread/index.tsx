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
    <View style={styles.container}>
      <Text style={styles.text}>{spreadText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.grey,
    fontWeight: "bold",
  },
  container: {
    borderBottomColor: colors.grey,
    padding: 10,
    paddingLeft: 15,
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default SpreadRow;
