import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const CustomButton = ({
  title,
  onPress,
  color,
  backgroundColor,
}: {
  title: string;
  onPress: () => void;
  color: string;
  backgroundColor: string;
}) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <Text style={[styles.customButton, { color, backgroundColor }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  customButton: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    fontWeight: "bold",
  },
});
