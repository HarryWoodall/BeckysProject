import * as React from "react";
import { NewPersonStyles } from "../common/types";
import { StyleSheet } from "react-native";

const Style = StyleSheet.create<NewPersonStyles>({
  basicInfo: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    // padding: 20,
  },
  selectionsContainer: {
    margin: 10,
    width: "auto",
  },
  pickerContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    zIndex: 100,
  },
  picker: {
    padding: 10,
    width: "auto",
  },
});

export default Style;
