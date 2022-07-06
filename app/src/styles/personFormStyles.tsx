import * as React from "react";
import { PersonFormStyles } from "../common/types";
import { StyleSheet } from "react-native";

const Style = StyleSheet.create<PersonFormStyles>({
  basicInfo: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    // padding: 20,
  },
  dateAndEventContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // flexWrap: "wrap",
    // width: "auto",
    // justifyContent: "center",
  },
  eventPicker: {
    flexGrow: 1,
    width: "auto",
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
