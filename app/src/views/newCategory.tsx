import { Text, View, ScrollView, Image, Pressable, TextInput } from "react-native";
import React, { useState, useEffect, Dispatch } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useIsFocused } from "@react-navigation/native";
import { NewCategoryProps, NewEventProps } from "../common/types";
import CommonStyles from "../styles/common";
import DefaultButton from "../components/defaultButton";
import EventModel from "../models/eventModel";
import { getAllUsers, removeAllCategories, removeAllEvents, storeCategory, storeEvent } from "../services/dataService";
import DropDownPicker from "react-native-dropdown-picker";
import CategoryModel from "../models/categoryModel";

const NewCategory = ({ route, navigation }: NewCategoryProps) => {
  const isFocused = useIsFocused();

  const [categoryName, setCategoryName] = useState<string>("");
  const [categoryNotes, setCategoryNotes] = useState<string>("");

  const [peopleSelector, setPeopleSelector] = useState(false);
  const [peopleValue, setPeopleValue] = useState<string[]>([]);
  const [selectorItems, setSelectorItems] = useState<ItemSchema[]>([]);

  interface ItemSchema {
    label: string;
    value: string;
  }

  useEffect(() => {
    async function getUserData() {
      const userData = await getAllUsers();
      var itemData: ItemSchema[] = userData!.map((user): ItemSchema => {
        return { label: user.name, value: user.id! };
      });

      itemData.push({ label: "New Person...", value: "NEW_PERSON" });

      setSelectorItems(itemData);
    }
    console.log("User data update");

    getUserData();
  }, [isFocused]);

  useEffect(() => {
    if (peopleValue?.includes("NEW_PERSON")) {
      setPeopleValue([]);

      navigation.push("NewPerson", { previousScreen: "NewCategory" });
    }
  }, [peopleValue]);

  const saveData = () => {
    const category: CategoryModel = {
      name: categoryName,
      people: peopleValue,
      notes: categoryNotes,
    };

    async function storeData() {
      await storeCategory(category);
      navigation.navigate(route.params?.previousScreen || "Homepage");
    }

    storeData();
  };

  return (
    <View style={CommonStyles.fullWidthView}>
      <View style={{ width: "100%" }}>
        <View>
          <Image source={require("../../assets/icon.png")} style={{ width: 150, height: 150, alignSelf: "center" }}></Image>
        </View>

        <TextInput onChangeText={(newText) => setCategoryName(newText)} placeholder="Category Name" style={CommonStyles.textbox} />
        <TextInput
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          onChangeText={(text) => setCategoryNotes(text)}
          style={CommonStyles.textbox}
          placeholder="Notes"
        />
        <DropDownPicker
          mode="BADGE"
          open={peopleSelector}
          value={peopleValue}
          items={selectorItems}
          setOpen={setPeopleSelector}
          setValue={setPeopleValue}
          setItems={setSelectorItems}
          multiple={true}
          placeholder="Persons"
          containerStyle={CommonStyles.dropDownPicker}
        />
        <DefaultButton text="Save" onPress={saveData} />
        <DefaultButton text="Remove all events" onPress={removeAllCategories} />
      </View>
    </View>
  );
};

export default NewCategory;
