import React from "react";

import colors from "../../constants/colors";

import { StyleSheet, Text, View } from "react-native";

interface ErrorMessageProps {
  display: boolean;
  text: string;
}

const ErrorMessage = (props: ErrorMessageProps): React.ReactElement | null => {
  if (!props.display) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.primaryText,
    fontWeight: "bold",
    textAlign: "left",
  },
  container: {
    padding: 10,
    paddingLeft: 15,
    flexDirection: "row",
    backgroundColor: colors.sellBackground,
  },
});

export default ErrorMessage;
