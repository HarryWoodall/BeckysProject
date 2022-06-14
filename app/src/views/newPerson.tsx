import { Text, View, Pressable, Image, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import { NewPersonProps } from "../common/types";
import CommonStyles from "../styles/common";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import UserModel from "../models/userModel";
import { storeUser } from "../services/dataService";

const NewPersonView = ({ navigation }: NewPersonProps) => {
  const [pronouns, setPronouns] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [age, setAge] = useState("");
  const [known, setKnown] = useState("");

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState<any>("date");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerText, setDatePickerText] = useState("Date last scene");

  const [openMutualFriends, setOpenMutualFriends] = useState(false);
  const [mutualFriendsValue, setMutualFriendsValue] = useState(null);
  const [mutualFriendsItems, setMutualFriendsItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);

  const [openCategories, setOpenCategories] = useState(false);
  const [categoriesValue, setCategoriesValue] = useState<string | null>(null);
  const [categoriesItems, setCategoriesItems] = useState([
    { label: "Cat1", value: "Cat1" },
    { label: "Cat2", value: "Cat2" },
  ]);

  const [talkAboutLast, setTalkAboutLast] = useState("");
  const [avoid, setAvoid] = useState("");
  const [notes, setNotes] = useState("");

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShowDatePicker(false);
    setDatePickerText(new Date(currentDate.toString()).toLocaleDateString());
    setDate(currentDate);
  };

  const showMode = (currentMode: any) => {
    setShowDatePicker(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const saveData = () => {
    const user: UserModel = {
      pronouns: pronouns,
      name: name,
      nickname: nickname,
      age: age,
      known: known,
      seenLast: date.toString(),
      mutualFriends: [],
      category: categoriesValue,
      lastTalkAbout: talkAboutLast,
      avoidTalkingAbout: avoid,
      notes: notes,
    };

    storeUser(user);
  };

  return (
    <View style={CommonStyles.fullWidthView}>
      <View style={{ flexDirection: "row" }}>
        <View>
          <TextInput onChangeText={(newText) => setPronouns(newText)} placeholder="Pronouns" />
          <TextInput onChangeText={(newText) => setName(newText)} placeholder="Name" />
          <TextInput onChangeText={(newText) => setNickname(newText)} placeholder="Nickname" />
          <TextInput onChangeText={(newText) => setAge(newText)} placeholder="Age" />
          <TextInput onChangeText={(newText) => setKnown(newText)} placeholder="How do you know them" />
        </View>
        <View>
          <Image source={require("../../assets/icon.png")} style={{ width: 100, height: 100 }}></Image>
          <Pressable onPress={showDatepicker}>
            <Text>{datePickerText}</Text>
          </Pressable>
          {showDatePicker && <DateTimePicker testID="dateTimePicker" value={date} mode={mode} is24Hour={true} onChange={onChange} />}
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View>
          <DropDownPicker
            open={openMutualFriends}
            value={mutualFriendsValue}
            items={mutualFriendsItems}
            setOpen={setOpenMutualFriends}
            setValue={setMutualFriendsValue}
            setItems={setMutualFriendsItems}
            style={{ width: 100 }}
          />
        </View>
        <View>
          <DropDownPicker
            open={openCategories}
            value={categoriesValue}
            items={categoriesItems}
            setOpen={setOpenCategories}
            setValue={setCategoriesValue}
            setItems={setCategoriesItems}
            style={{ width: 100 }}
          />
        </View>
      </View>
      <View style={{ alignSelf: "stretch" }}>
        <Text>What did you last talk about?</Text>
        <TextInput
          multiline
          numberOfLines={4}
          placeholder="TExt"
          textAlignVertical="top"
          style={{ backgroundColor: "red" }}
          onChangeText={(text) => setTalkAboutLast(text)}
        />

        <Text>What to avoid talking about</Text>
        <TextInput
          multiline
          numberOfLines={4}
          placeholder="TExt"
          textAlignVertical="top"
          style={{ backgroundColor: "red" }}
          onChangeText={(text) => setAvoid(text)}
        />

        <Text>Notes</Text>
        <TextInput
          multiline
          numberOfLines={4}
          placeholder="TExt"
          textAlignVertical="top"
          style={{ backgroundColor: "red" }}
          onChangeText={(text) => setNotes(text)}
        />
      </View>
      <Pressable onPress={saveData}>
        <Text>Save</Text>
      </Pressable>
    </View>
  );
};

export default NewPersonView;
