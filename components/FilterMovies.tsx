import { NavigationProp } from "@react-navigation/core";
import { observer } from "mobx-react-lite";
import React, { useRef } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useQuery } from "react-query";
import { useDebounced } from "../hooks/useDebounced";
import { store } from "../store/MoviesStore";
import { FilterAndGenreList } from "./ForFilterAndGenresList";
import { styles } from "../styles/styles";
import { CustomButton } from "./CustomButton";

export const FilterMovies = observer(
  ({ navigation }: { navigation: NavigationProp<any> }) => {
    const [value, setValue] = React.useState("");
    const [pressed, setPressed] = React.useState(false);
    const search = useDebounced(value, 1000);
    const flatListRef = useRef<any>();
    const toTop = () => {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    };
    //ne dela ref
    const { isLoading, isError, isIdle, data } = useQuery(
      ["FilteredMovies", search, store.pageNumber],
      () => {
        if (search === "") return;
        return store.fetchFilteredMovies(search);
      },
      { keepPreviousData: true }
    );
    return (
      <View style={{ marginBottom: 400, width: "100%" }}>
        <TouchableWithoutFeedback
          onPress={() => {
            setPressed(false);
            Keyboard.dismiss();
          }}
        >
          <View
            style={[
              !pressed
                ? { marginBottom: 200 }
                : { marginBottom: 200, transform: [{ translateY: 70 }] },
            ]}
          >
            <TextInput
              onFocus={() => setPressed(true)}
              onChangeText={(e) => {
                store.resetPageNumber();
                setValue(e);
              }}
              onSubmitEditing={() => setPressed(false)}
              placeholder="go yes"
              style={{
                marginTop: 140,
                borderRadius: 5,
                borderColor: "grey",
                borderWidth: 2,
                padding: 10,
                marginHorizontal: 20,
                marginBottom: -20,
              }}
            ></TextInput>
            <Text></Text>
            <FilterAndGenreList
              // ref={flatListRef}
              navigation={navigation}
              isError={isError}
              isLoading={isLoading}
              isIdle={isIdle}
              moviesData={data}
            ></FilterAndGenreList>
          </View>
        </TouchableWithoutFeedback>
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
          }}
        >
          <CustomButton
            title="Prev Page"
            color="white"
            backgroundColor="orange"
            onPress={() => store.decreasePageNumber()}
          ></CustomButton>
          <Text style={styles.pageNumber}>{store.pageNumber}</Text>
          <CustomButton
            title="Next Page"
            color="white"
            backgroundColor="orange"
            onPress={() => store.increasePageNumber()}
          ></CustomButton>
        </View>
      </View>
    );
  }
);
