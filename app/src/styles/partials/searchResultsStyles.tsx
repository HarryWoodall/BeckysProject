import * as React from "react";
import { SearchResultsStyles } from "../../common/types";
import { StyleSheet } from "react-native";

const Style = StyleSheet.create<SearchResultsStyles>({
  container: {
    margin: 20,
  },
  heading: {
    fontSize: 15,
    paddingLeft: 15,
    backgroundColor: "#b5b5b5",
  },
  sectionContainer: {
    padding: 10,
  },
  resultItem: {
    alignSelf: "flex-start",
    marginLeft: 20,
    fontSize: 22,
    paddingVertical: 5,
  },
});

export default Style;
