import React from "react";
import { Text, View } from "react-native";
import { DataFieldProps } from "../common/types";
import CommonStyle from "../styles/common";
import Style from "../styles/components/dataFieldStyle";

const DataField = (props: DataFieldProps) => {
  if (props.text) {
    return (
      <View style={Style.container}>
        <Text style={[Style.title, CommonStyle.heading2]}>{props.title}</Text>
        <Text style={[Style.text, CommonStyle.text]}>{props.text}</Text>
      </View>
    );
  } else {
    return null;
  }
};

export default DataField;
