import * as React from "react";
import { PersonStyles } from "../common/types";
import { StyleSheet } from "react-native";

const PersonStyle = StyleSheet.create<PersonStyles>({
  basicInfo: {
    flexDirection: "row",
  },
  icon: { width: 150, height: 150 },
  detailInfo: {
    flexDirection: "row",
  },
  list: {},
  lastSawThemContainer: {
    flexDirection: "row",
    alignSelf: "center",
  },
  lastSawThemItem: {
    margin: 5,
    alignSelf: "center",
  },
});

export default PersonStyle;
