import { Text, View, ScrollView, Image, Pressable, TextInput } from "react-native";
import React, { useState, useEffect, Dispatch } from "react";
import { useIsFocused } from "@react-navigation/native";
import { CategoryFormProps, EventFormProps } from "../common/types";
import CommonStyles from "../styles/common";
import DefaultButton from "../components/defaultButton";
import { getAllUsers, removeAllCategories, removeAllEvents, storeCategory, storeEvent, updateCategory } from "../services/dataService";
import DropDownPicker from "react-native-dropdown-picker";
import CategoryModel from "../models/categoryModel";
import UserModel from "../models/userModel";

const NewCategory = ({ route, navigation }: CategoryFormProps) => {
  const isFocused = useIsFocused();

  const [categoryName, setCategoryName] = useState<string>("");
  const [categoryNotes, setCategoryNotes] = useState<string>("");

  const [peopleSelector, setPeopleSelector] = useState(false);
  const [peopleValue, setPeopleValue] = useState<string[]>([]);
  const [peopleItems, setPeopleItems] = useState<UserModel[]>([]);

  interface ItemSchema {
    label: string;
    value: string;
  }

  useEffect(() => {
    if (route.params?.categoryModel) {
      const category = route.params.categoryModel;
      setCategoryName(category.name);
      setCategoryNotes(category.notes);
    }

    async function getUserData(ids: string[] = []) {
      const peopleData = await getAllUsers();
      setPeopleItems(peopleData!);

      if (ids.length > 0) {
        setPeopleValue(ids);
      }
    }

    getUserData(route.params?.categoryModel?.people);
  }, [isFocused]);

  useEffect(() => {
    if (peopleValue?.includes("NEW_PERSON")) {
      setPeopleValue([]);

      navigation.push("PersonForm", { previousScreen: "CategoryForm" });
    }
  }, [peopleValue]);

  const mapPeople = () => {
    let people = peopleItems?.map((item) => {
      return { label: item.name, value: item.id };
    });

    people.push({ label: "New Person...", value: "NEW_PERSON" });
    return people;
  };

  const saveData = () => {
    const category: CategoryModel = {
      name: categoryName,
      people: peopleValue,
      notes: categoryNotes,
      id: route.params?.categoryModel?.id,
    };

    async function storeData() {
      if (route.params?.categoryModel) {
        await updateCategory(category, category.id!);
        console.log("updating category");
      } else {
        console.log("storing category");
        await storeCategory(category);
      }

      navigation.goBack();
      // navigation.navigate(route.params?.previousScreen || "Homepage");
    }

    storeData();
  };

  return (
    <View style={CommonStyles.fullWidthView}>
      <View style={{ width: "100%" }}>
        <View>
          <Image source={require("../../assets/icon.png")} style={{ width: 150, height: 150, alignSelf: "center" }}></Image>
        </View>

        <TextInput
          onChangeText={(newText) => setCategoryName(newText)}
          placeholder="Category Name"
          style={CommonStyles.textbox}
          value={categoryName}
          testID="CategoryNameInput"
        />
        <TextInput
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          onChangeText={(text) => setCategoryNotes(text)}
          style={CommonStyles.textbox}
          placeholder="Notes"
          value={categoryNotes}
          testID="NotesInput"
        />
        <DropDownPicker
          mode="BADGE"
          open={peopleSelector}
          value={peopleValue}
          items={mapPeople()}
          setOpen={setPeopleSelector}
          setValue={setPeopleValue}
          setItems={setPeopleItems}
          multiple={true}
          placeholder="Persons"
          containerStyle={CommonStyles.dropDownPicker}
        />
        <DefaultButton text="Save" onPress={saveData} testID="SaveCategoryButton" />
        <DefaultButton text="Remove all events" onPress={removeAllCategories} />
      </View>
    </View>
  );
};

export default NewCategory;
