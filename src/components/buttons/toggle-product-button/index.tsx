import React from "react";

import colors from "../../constants/colors";
import strings from "../../constants/strings";

import { Pressable, Text, StyleSheet, View } from "react-native";

interface ToggleProductButtonProps {
  onToggle: () => void;
}

const ToggleProductButton = (
  props: ToggleProductButtonProps,
): React.ReactElement => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={props.onToggle}>
        <Text style={styles.text}>{strings.toggleFeed}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.toggleButton,
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 30,
    borderRadius: 3,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  text: {
    color: colors.primaryText,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default ToggleProductButton;
