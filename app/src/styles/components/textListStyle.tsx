import * as React from "react";
import { StyleSheet } from "react-native";
import { TextListStyle } from "../../common/types";

const Style = StyleSheet.create<TextListStyle>({
  title: {
    // fontSize: 20,
  },
  link: {},
  text: {
    marginLeft: 10,
  },
  container: {
    margin: 5,
  },
});

export default Style;
