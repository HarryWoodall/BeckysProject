import React from "react";
import { Text, View, Pressable } from "react-native";
import { TextListProps } from "../common/types";
import Style from "../styles/userCardStyle";
import CommonStyles from "../styles/common";
import TextListStyle from "../styles/components/textListStyle";
import ClickableLink from "./clickableLink";

const TextList = (props: TextListProps) => {
  const textList = props.list?.map((item, index) => {
    return <Text key={index.toString()}>{item}</Text>;
  });

  if (props.list && props.list?.length > 0) {
    return (
      <View style={TextListStyle.container}>
        <Text style={[CommonStyles.heading2, TextListStyle.title]}>{props.title}</Text>
        <View>{textList}</View>
      </View>
    );
  } else if (props.messageIfEmpty) {
    return (
      <View style={TextListStyle.container}>
        <Text style={[CommonStyles.heading2, TextListStyle.title]}>{props.title}</Text>
        <Text style={[CommonStyles.text, { marginLeft: 5 }]}>{props.messageIfEmpty}</Text>
      </View>
    );
  } else {
    return null;
  }
};

export default TextList;
