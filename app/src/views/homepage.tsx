import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Pressable, Image, SectionList } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { HomepageProps, RootStackParamList } from "../common/types";
import UserModel from "../models/userModel";
import { getAllCategorys, getAllEvents, getAllUsers } from "../services/dataService";
import CommonStyles from "../styles/common";
import HomepageStyles from "../styles/homepage";
import EventModel from "../models/eventModel";
import TextList from "../components/textList";
import CategoryModel from "../models/categoryModel";
import DefaultButton from "../components/defaultButton";

const HomepageView = ({ navigation }: HomepageProps) => {
  const [users, setUsers] = useState<UserModel[]>();
  const [events, setEvents] = useState<EventModel[]>();
  const [categories, setCategories] = useState<CategoryModel[]>();

  const isFocused = useIsFocused();
  console.log("isFocused: ", isFocused);

  const navigateSearch = () => {
    navigation.navigate("Search");
  };

  const navigateNewUser = () => {
    navigation.navigate("PersonForm");
  };

  const navigateNewEvent = () => {
    navigation.navigate("EventForm");
  };

  const navigateNewCategory = () => {
    navigation.navigate("CategoryForm");
  };

  useEffect(() => {
    async function getUserData() {
      let userData = await getAllUsers();
      setUsers(userData!);
      console.log("User data update");
    }

    async function getEventData() {
      let eventData = await getAllEvents();
      setEvents(eventData!);
      console.log("event data update");
    }

    async function getCategoryData() {
      let categoryData = await getAllCategorys();
      setCategories(categoryData!);
      console.log("category data update");
    }

    getUserData();
    getEventData();
    getCategoryData();
  }, [isFocused]);

  return (
    <View style={CommonStyles.fullWidthView}>
      <Image source={require("../../assets/icon.png")} style={{ width: 200, height: 200 }}></Image>
      <DefaultButton onPress={navigateSearch} text="Search" />
      <DefaultButton onPress={navigateNewUser} text="Did you meet someone new?" />
      <DefaultButton onPress={navigateNewEvent} text="New Event" />
      <DefaultButton onPress={navigateNewCategory} text="New Category" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "rgba(247,247,247,1.0)",
  },
  item: {
    padding: 5,
    fontSize: 16,
  },
});

export default HomepageView;
