import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { userCardProps } from "../common/types";
import Style from "../styles/userCardStyle";

const UserCard = (props: userCardProps) => {
  return (
    <View style={[Style.card]}>
      <Text style={[Style.name]}>{props.name}</Text>
      <Text style={[Style.description]}>{props.description}</Text>
    </View>
  );
};

export default UserCard;
