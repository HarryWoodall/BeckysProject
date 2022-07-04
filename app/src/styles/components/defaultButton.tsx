import * as React from "react";
import { StyleSheet } from "react-native";
import { DefaultButtonStyles } from "../../common/types";

const Common = StyleSheet.create<DefaultButtonStyles>({
  text: {
    alignItems: "center",
    alignSelf: "center",
    color: "white",
    fontWeight: "bold",
  },
  button: {
    margin: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 1,
  },
});

export default Common;
