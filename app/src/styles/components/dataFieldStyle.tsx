import * as React from "react";
import { StyleSheet } from "react-native";
import { DataFieldStyle } from "../../common/types";

const Common = StyleSheet.create<DataFieldStyle>({
  title: {
    fontSize: 20,
  },
  text: {
    marginLeft: 10,
  },
  container: {
    margin: 5,
  },
});

export default Common;
