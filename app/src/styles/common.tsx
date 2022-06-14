import * as React from "react";
import { CommonStyles } from "../common/types";
import { StyleSheet } from "react-native";

const Common = StyleSheet.create<CommonStyles>({
  fullWidthView: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "white",
    width: "80%",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
  },
  buttonPressed: {
    backgroundColor: "gray",
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default Common;
