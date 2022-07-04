import { Text, View, Pressable, Image, TextInput, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import React, { useState, useEffect } from "react";
import { NewPersonProps } from "../common/types";
import CommonStyles from "../styles/common";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import UserModel from "../models/userModel";
import { storeUser, removeAllUsers, getAllUsers, getAllCategorys } from "../services/dataService";
import DefaultButton from "../components/defaultButton";
import NewPersonStyles from "../styles/newPersonStyles";
import CategoryModel from "../models/categoryModel";
import { useIsFocused } from "@react-navigation/native";

const NewPersonView = ({ route, navigation }: NewPersonProps) => {
  const isFocused = useIsFocused();

  const [pronouns, setPronouns] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [age, setAge] = useState("");
  const [known, setKnown] = useState("");

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<any>("date");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerText, setDatePickerText] = useState("Date last scene");

  const [openMutualFriends, setOpenMutualFriends] = useState(false);
  const [mutualFriendsValue, setMutualFriendsValue] = useState<string[]>([]);
  const [mutualFriendsItems, setMutualFriendsItems] = useState<UserModel[]>([]);

  const [openCategories, setOpenCategories] = useState(false);
  const [categoriesValue, setCategoriesValue] = useState([]);
  const [categoriesItems, setCategoriesItems] = useState<CategoryModel[]>([]);

  const [talkAboutLast, setTalkAboutLast] = useState("");
  const [avoid, setAvoid] = useState("");
  const [notes, setNotes] = useState("");

  const [image, setImage] = useState<string>("");

  useEffect(() => {
    async function getData() {
      let people = (await getAllUsers()) || [];
      if (people) setMutualFriendsItems(people);

      let categories = await getAllCategorys();
      if (categories) setCategoriesItems(categories);
    }
    console.log("User data update");

    getData();
  }, [isFocused]);

  useEffect(() => {
    if (mutualFriendsValue.includes("NEW_PERSON")) {
      setMutualFriendsValue([]);

      navigation.push("NewPerson", { previousScreen: "NewPerson" });
    }
  }, [mutualFriendsValue]);

  const onDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShowDatePicker(false);
    setDatePickerText(new Date(currentDate.toString()).toLocaleDateString());
    setDate(currentDate);
  };

  const showImage = () => {
    if (!image) {
      return require("../../assets/icon.png");
    } else {
      return { uri: image };
    }
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
      mutualFriends: mutualFriendsValue,
      category: categoriesValue,
      lastTalkAbout: talkAboutLast,
      avoidTalkingAbout: avoid,
      notes: notes,
    };

    async function storeData() {
      await storeUser(user);
      if (route.params?.previousScreen == "NewPerson") navigation.goBack();

      navigation.navigate(route.params?.previousScreen || "Homepage");
    }

    storeData();
  };

  const mapFriends = () => {
    let friends = mutualFriendsItems?.map((item) => {
      return { label: item.name, value: item.id };
    });

    friends.push({ label: "New Person...", value: "NEW_PERSON" });
    return friends;
  };

  const mapCategories = () => {
    let categories = categoriesItems?.map((item) => {
      return { label: item.name, value: item.id };
    });

    categories.push({ label: "New Categories...", value: "NEW_CATEGORY" });
    return categories;
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    // });

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  interface ItemSchema {
    label: string;
    value: string;
  }

  console.log(image);

  return (
    <ScrollView style={CommonStyles.fullWidthScrollView}>
      <View style={NewPersonStyles.basicInfo}>
        <View>
          <TextInput onChangeText={(newText) => setPronouns(newText)} placeholder="Pronouns" style={CommonStyles.textbox} />
          <TextInput onChangeText={(newText) => setName(newText)} placeholder="Name" style={CommonStyles.textbox} />
          <TextInput onChangeText={(newText) => setNickname(newText)} placeholder="Nickname" style={CommonStyles.textbox} />
          <TextInput onChangeText={(newText) => setAge(newText)} placeholder="Age" style={CommonStyles.textbox} />
          <TextInput onChangeText={(newText) => setKnown(newText)} placeholder="How do you know them" style={CommonStyles.textbox} />
        </View>
        <View>
          <Pressable onPress={pickImage}>
            <Image source={showImage()} style={{ width: 100, height: 100 }}></Image>
          </Pressable>
          <Pressable onPress={showDatepicker}>
            <Text>{datePickerText}</Text>
          </Pressable>
          {showDatePicker && <DateTimePicker testID="dateTimePicker" value={date} mode={mode} is24Hour={true} onChange={onDateChange} />}
        </View>
      </View>
      <Text style={CommonStyles.heading2}>Mutual Friends</Text>
      <View style={NewPersonStyles.pickerContainer}>
        <DropDownPicker
          open={openMutualFriends}
          value={mutualFriendsValue}
          items={mapFriends()}
          setOpen={setOpenMutualFriends}
          setValue={setMutualFriendsValue}
          setItems={setMutualFriendsItems}
          mode="BADGE"
          listMode="MODAL"
          multiple={true}
          containerStyle={CommonStyles.dropDownPicker}
          // style={{ width: 100 }}
          // listParentContainerStyle={NewPersonStyles.picker}
        />
        <Text style={CommonStyles.heading2}>Categories</Text>
        <DropDownPicker
          open={openCategories}
          value={categoriesValue}
          items={mapCategories()}
          setOpen={setOpenCategories}
          setValue={setCategoriesValue}
          setItems={setCategoriesItems}
          mode="BADGE"
          listMode="MODAL"
          multiple={true}
          containerStyle={CommonStyles.dropDownPicker}
        />
      </View>
      <View style={{ alignSelf: "stretch" }}>
        <Text style={CommonStyles.heading2}>What did you last talk about?</Text>
        <TextInput
          style={CommonStyles.textArea}
          multiline
          numberOfLines={4}
          placeholder="Text"
          textAlignVertical="top"
          onChangeText={(text) => setTalkAboutLast(text)}
        />

        <Text style={CommonStyles.heading2}>What to avoid talking about</Text>
        <TextInput
          style={CommonStyles.textArea}
          multiline
          numberOfLines={4}
          placeholder="Text"
          textAlignVertical="top"
          onChangeText={(text) => setAvoid(text)}
        />

        <Text style={CommonStyles.heading2}>Notes</Text>
        <TextInput
          style={CommonStyles.textArea}
          multiline
          numberOfLines={4}
          placeholder="Text"
          textAlignVertical="top"
          onChangeText={(text) => setNotes(text)}
        />
      </View>
      <DefaultButton text="Save" onPress={saveData} />
      <DefaultButton text="Remove all users" onPress={removeAllUsers} />
    </ScrollView>
  );
};

export default NewPersonView;
