import * as React from "react";
import { UserCardStyles } from "../common/types";
import { StyleSheet } from "react-native";

const UserCardStyle = StyleSheet.create<UserCardStyles>({
  name: {
    color: "#000",
    textAlign: "left",
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {
    color: "#333",
    textAlign: "left",
    fontSize: 16,
  },
  card: {
    flexDirection: "column",
    backgroundColor: "#aaa",
    borderRadius: 10,
    margin: 10,
    padding: 10,
    width: "50%",
    alignSelf: "center",
  },
  image: {
    width: 16,
    height: 16,
  },
  button: {},
});

export default UserCardStyle;
