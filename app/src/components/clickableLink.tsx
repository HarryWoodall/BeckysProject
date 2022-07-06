import React from "react";
import { Pressable, Text } from "react-native";
import { ClickableLinkProps } from "../common/types";
import Style from "../styles/components/clickableLinkStyle";
import CommonStyle from "../styles/common";

const ClickableLink = (props: ClickableLinkProps) => {
  return (
    <Pressable onPress={props.onPress} style={props.containerStyle}>
      <Text style={[CommonStyle.link, props.textStyle]}>{props.text}</Text>
    </Pressable>
  );
};

export default ClickableLink;
