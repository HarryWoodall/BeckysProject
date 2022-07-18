import { Text, View, ScrollView, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { CategoryProps, EventProps, Link } from "../common/types";
import CommonStyles from "../styles/common";
import { getCategory, getUsers } from "../services/dataService";
import DefaultButton from "../components/defaultButton";
import TextList from "../components/textList";
import UserModel from "../models/userModel";
import CategoryModel from "../models/categoryModel";
import DataField from "../components/dataField";
import LinkList from "../components/linkList";

const Category = ({ route, navigation }: CategoryProps) => {
  const isFocused = useIsFocused();

  const [category, setCategory] = useState<CategoryModel>();
  const [people, setPeople] = useState<UserModel[]>();

  useEffect(() => {
    async function getCategoryData() {
      let categoryData = await getCategory(route.params.id);
      setCategory(categoryData!);

      let attendees = await getUsers(categoryData?.people!);
      setPeople(attendees);
    }
    console.log("User data update");

    getCategoryData();
  }, [isFocused]);

  return (
    <ScrollView style={CommonStyles.fullWidthScrollView}>
      <View>
        <Image source={require("../../assets/icon.png")} style={{ width: 150, height: 150, alignSelf: "center", margin: 10 }}></Image>
      </View>

      <DataField title="Name" text={category?.name} />

      <LinkList
        title="People in group"
        list={people?.map((person) => {
          let link: Link = { id: person.id!, text: person.name };
          return link;
        })}
        linkRoute="Person"
        navigation={navigation}
        messageIfEmpty="There are not people in this group"
        testIDPrefix="PeopleLink"
      />

      <DataField title="Notes" text={category?.notes} />
      <DefaultButton text="Edit" onPress={() => navigation.navigate("CategoryForm", { previousScreen: "Category", categoryModel: category })} />
    </ScrollView>
  );
};

export default Category;
