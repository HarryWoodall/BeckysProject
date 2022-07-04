import * as React from "react";
import { PersonProfileStyles } from "../common/types";
import { StyleSheet } from "react-native";

const PersonProfileStyle = StyleSheet.create<PersonProfileStyles>({
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

export default PersonProfileStyle;
