import React from "react";
import { Text, View, Pressable } from "react-native";
import { LinkListProps } from "../common/types";
import Style from "../styles/userCardStyle";
import CommonStyles from "../styles/common";
import TextListStyle from "../styles/components/textListStyle";
import ClickableLink from "./clickableLink";

const LinkList = (props: LinkListProps) => {
  const linkList = props.list?.map((item, index) => {
    return <ClickableLink key={index.toString()} text={item.text} onPress={() => props.navigation.push(props.linkRoute!, { id: item.id })} />;
  });

  if (props.list && props.list?.length > 0) {
    return (
      <View style={TextListStyle.container}>
        <Text style={[CommonStyles.heading2, TextListStyle.title]}>{props.title}</Text>
        <View style={{ alignSelf: "flex-start", marginLeft: 5 }}>{linkList}</View>
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

export default LinkList;
