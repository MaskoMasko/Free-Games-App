import React from "react";
import { View, Text, Image } from "react-native";
export const MovieRating = ({ movie }: { movie: any }) => {
  return (
    <View style={{ alignSelf: "center", flexDirection: "row" }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          marginRight: 10,
          marginBottom: 5,
        }}
      >
        {movie.item.rating}
      </Text>
      <Image
        source={{
          uri:
            "https://www.iconsdb.com/icons/preview/color/FCC203/star-2-xxl.png",
        }}
        style={{ width: 30, height: 30 }}
      ></Image>
    </View>
  );
};
