import { Text, View, Pressable, Image, TextInput, ScrollView, SafeAreaView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import React, { useState, useEffect } from "react";
import { PersonFormProps } from "../common/types";
import CommonStyles from "../styles/common";
import DropDownPicker, { ItemType } from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import UserModel from "../models/userModel";
import { storeUser, removeAllUsers, getAllUsers, getAllCategorys, updatePerson, getAllEvents } from "../services/dataService";
import DefaultButton from "../components/defaultButton";
import PersonFormStyles from "../styles/personFormStyles";
import CategoryModel from "../models/categoryModel";
import { useIsFocused } from "@react-navigation/native";
import EventModel from "../models/eventModel";

const NewPersonView = ({ route, navigation }: PersonFormProps) => {
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

  const [openLastSceneEvent, setOpenLastSceneEvent] = useState(false);
  const [lastSceneEventValue, setLastSceneEventValue] = useState<string>("");
  const [lastSceneEventItems, setLastSceneEventItems] = useState<EventModel[]>([]);

  const [openMutualFriends, setOpenMutualFriends] = useState(false);
  const [mutualFriendsValue, setMutualFriendsValue] = useState<string[]>([]);
  const [mutualFriendsItems, setMutualFriendsItems] = useState<UserModel[]>([]);

  const [openCategories, setOpenCategories] = useState(false);
  const [categoriesValue, setCategoriesValue] = useState<string[]>([]);
  const [categoriesItems, setCategoriesItems] = useState<CategoryModel[]>([]);

  const [talkAboutLast, setTalkAboutLast] = useState("");
  const [avoid, setAvoid] = useState("");
  const [notes, setNotes] = useState("");
  const [conversationStarters, setConversationStarters] = useState("");

  const [image, setImage] = useState<string>("");

  useEffect(() => {
    if (route.params?.personModel) {
      const person = route.params.personModel;
      setPronouns(person.pronouns);
      setName(person.name);
      setNickname(person.nickname);
      setAge(person.age);
      setKnown(person.known);
      setDate(new Date(person.seenLast));
      setLastSceneEventValue(person.seenLastEvent);
      setMutualFriendsValue(person.mutualFriends);
      setCategoriesValue(person.category);
      setTalkAboutLast(person.lastTalkAbout);
      setAvoid(person.avoidTalkingAbout);
      setNotes(person.notes);
      setConversationStarters(person.conversationStarters);

      setDatePickerText(new Date(person.seenLast).toLocaleDateString());
    }

    async function getData() {
      let people = (await getAllUsers()) || [];
      if (people) setMutualFriendsItems(people);

      let categories = await getAllCategorys();
      if (categories) setCategoriesItems(categories);

      let events = (await getAllEvents()) || [];
      if (events) setLastSceneEventItems(events);
    }
    console.log(route.params);
    console.log("User data update");

    getData();
  }, [isFocused]);

  useEffect(() => {
    if (mutualFriendsValue.includes("NEW_PERSON")) {
      setMutualFriendsValue([]);

      navigation.push("PersonForm", { previousScreen: "PersonForm" });
    }
  }, [mutualFriendsValue]);

  useEffect(() => {
    if (categoriesValue.includes("NEW_CATEGORY")) {
      setCategoriesValue([]);

      navigation.push("CategoryForm", { previousScreen: "PersonForm" });
    }
  }, [categoriesValue]);

  useEffect(() => {
    if (lastSceneEventValue == "NEW_EVENT") {
      setLastSceneEventValue("");

      navigation.push("EventForm", { previousScreen: "PersonForm" });
    }
  }, [lastSceneEventValue]);

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
      seenLastEvent: lastSceneEventValue,
      mutualFriends: mutualFriendsValue,
      category: categoriesValue,
      lastTalkAbout: talkAboutLast,
      avoidTalkingAbout: avoid,
      notes: notes,
      conversationStarters: conversationStarters,
      id: route.params?.personModel?.id,
    };

    console.log(user);

    async function storeData() {
      if (route.params?.personModel) {
        await updatePerson(user, route.params.personModel.id!);
      } else {
        await storeUser(user);
      }

      navigation.goBack();
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

    categories.push({ label: "New Category...", value: "NEW_CATEGORY" });
    return categories;
  };

  const mapEvents = () => {
    let events = lastSceneEventItems?.map((item) => {
      return { label: item.name, value: item.id };
    });

    events.push({ label: "New Event...", value: "NEW_EVENT" });
    return events;
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

  console.log(image);

  return (
    <ScrollView style={CommonStyles.fullWidthScrollView} nestedScrollEnabled={true}>
      <View style={PersonFormStyles.basicInfo}>
        <View>
          <TextInput onChangeText={(newText) => setPronouns(newText)} placeholder="Pronouns" style={CommonStyles.textbox} value={pronouns} />
          <TextInput onChangeText={(newText) => setName(newText)} placeholder="Name" style={CommonStyles.textbox} value={name} />
          <TextInput onChangeText={(newText) => setNickname(newText)} placeholder="Nickname" style={CommonStyles.textbox} value={nickname} />
          <TextInput onChangeText={(newText) => setAge(newText)} placeholder="Age" style={CommonStyles.textbox} value={age} />
          <TextInput onChangeText={(newText) => setKnown(newText)} placeholder="How do you know them" style={CommonStyles.textbox} value={known} />
        </View>
        <View>
          <Pressable onPress={pickImage}>
            <Image source={showImage()} style={{ width: 100, height: 100 }}></Image>
          </Pressable>
        </View>
      </View>
      <View style={PersonFormStyles.dateAndEventContainer}>
        <Pressable onPress={showDatepicker}>
          <Text style={CommonStyles.dateDisplayText}>{datePickerText}</Text>
        </Pressable>
        {showDatePicker && <DateTimePicker testID="dateTimePicker" value={date} mode={mode} is24Hour={true} onChange={onDateChange} />}
        <Text>at</Text>
        <DropDownPicker
          open={openLastSceneEvent}
          value={lastSceneEventValue}
          items={mapEvents()}
          setOpen={setOpenLastSceneEvent}
          setValue={setLastSceneEventValue}
          setItems={setLastSceneEventItems}
          containerStyle={[PersonFormStyles.eventPicker, CommonStyles.dropDownPicker]}
          listMode="SCROLLVIEW"
          dropDownDirection="BOTTOM"
          style={PersonFormStyles.eventPicker}
        />
      </View>
      <Text style={CommonStyles.heading2}>Mutual Friends</Text>
      <View style={PersonFormStyles.pickerContainer}>
        <DropDownPicker
          open={openMutualFriends}
          value={mutualFriendsValue}
          items={mapFriends()}
          setOpen={setOpenMutualFriends}
          setValue={setMutualFriendsValue}
          setItems={setMutualFriendsItems}
          mode="BADGE"
          listMode="SCROLLVIEW"
          dropDownDirection="BOTTOM"
          multiple={true}
          containerStyle={CommonStyles.dropDownPicker}
          zIndex={3000}
          zIndexInverse={1000}
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
          listMode="SCROLLVIEW"
          dropDownDirection="BOTTOM"
          multiple={true}
          containerStyle={CommonStyles.dropDownPicker}
          zIndex={2000}
          zIndexInverse={2000}
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
          value={talkAboutLast}
        />

        <Text style={CommonStyles.heading2}>What to avoid talking about</Text>
        <TextInput
          style={CommonStyles.textArea}
          multiline
          numberOfLines={4}
          placeholder="Text"
          textAlignVertical="top"
          onChangeText={(text) => setAvoid(text)}
          value={avoid}
        />

        <Text style={CommonStyles.heading2}>Notes</Text>
        <TextInput
          style={CommonStyles.textArea}
          multiline
          numberOfLines={4}
          placeholder="Text"
          textAlignVertical="top"
          onChangeText={(text) => setNotes(text)}
          value={notes}
        />

        <Text style={CommonStyles.heading2}>Conversation Starters</Text>
        <TextInput
          style={CommonStyles.textArea}
          multiline
          numberOfLines={4}
          placeholder="Text"
          textAlignVertical="top"
          onChangeText={(text) => setConversationStarters(text)}
          value={conversationStarters}
        />
      </View>
      <DefaultButton text="Save" onPress={saveData} />
      <DefaultButton text="Remove all users" onPress={removeAllUsers} />
    </ScrollView>
  );
};

export default NewPersonView;
