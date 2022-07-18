import React from "react";
import { Pressable, Text } from "react-native";
import { DefaultButtonProps } from "../common/types";
import Style from "../styles/components/defaultButton";

const DefaultButton = (props: DefaultButtonProps) => {
  return (
    <Pressable
      onPress={props.onPress}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "#aaaaaa" : "#5e5e5e",
        },
        Style.button,
      ]}
      testID={props.testID}
    >
      <Text style={Style.text}>{props.text}</Text>
    </Pressable>
  );
};

export default DefaultButton;
