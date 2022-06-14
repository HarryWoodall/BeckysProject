import React, { useState, useEffect } from "react";
import { TextInput, Text, View, Button } from "react-native";
import { userCardProps } from "../common/types";
import Style from "../styles/userCardStyle";
import { getUser, storeUser } from "../services/dataService";
import UserModel from "../models/userModel";

const UserInput = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [output, setOutput] = useState<UserModel>();

  async function updateText() {
    let outputString = await getUser("userTest");
    setOutput(outputString);
  }

  function handelPress() {
    storeUser("userTest", { name: name, description: description });
    updateText();
  }

  useEffect(() => {
    updateText();
  }, []);

  return (
    <View style={[Style.card]}>
      <TextInput style={{ height: 40 }} placeholder="Name" onChangeText={(newText) => setName(newText)} defaultValue={name} />
      <TextInput style={{ height: 40 }} placeholder="Description" onChangeText={(newText) => setDescription(newText)} defaultValue={description} />
      <Button title="Store data" onPress={handelPress} />
      <Text style={[Style.description]}>{output?.name}</Text>
    </View>
  );
};

export default UserInput;
