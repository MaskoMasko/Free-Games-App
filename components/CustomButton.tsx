import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { styles } from "../styles/styles";

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
