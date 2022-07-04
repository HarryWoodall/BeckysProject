import * as React from "react";
import { CommonStyles } from "../common/types";
import { StyleSheet } from "react-native";

const Common = StyleSheet.create<CommonStyles>({
  fullWidthView: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "white",
    width: "100%",
    padding: 10,
  },
  fullWidthScrollView: {
    alignSelf: "center",
    backgroundColor: "white",
    width: "100%",
    padding: 10,
  },
  heading1: {},
  heading2: {
    fontSize: 25,
    marginBottom: 8,
  },
  text: {
    color: "gray",
    fontSize: 20,
  },
  link: {
    color: "blue",
    fontSize: 20,
  },
  textbox: {
    fontSize: 15,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "gray",
    borderRadius: 10,
    margin: 5,
    padding: 5,
    paddingLeft: 15,
  },
  textArea: {
    fontSize: 15,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "gray",
    borderRadius: 10,
    margin: 5,
    padding: 5,
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
  dateDisplayText: {
    color: "white",
    backgroundColor: "orange",
    padding: 10,
    margin: 10,
  },
  searchBar: {
    backgroundColor: "#c9c5c5",
    width: "100%",
    height: 50,
    paddingLeft: 20,
  },
  dropDownPicker: {
    margin: 10,
    width: "auto",
  },
});

export default Common;
