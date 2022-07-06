import React, { useEffect, useState } from "react";
import { Text, View, ScrollView } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { SearchResultsProps } from "../common/types";
import UserModel from "../models/userModel";
import { getAllCategorys, getAllEvents, getAllUsers, searchAll } from "../services/dataService";
import CommonStyles from "../styles/common";
import SearchResultsStyles from "../styles/partials/searchResultsStyles";
import EventModel from "../models/eventModel";
import CategoryModel from "../models/categoryModel";
import ClickableLink from "../components/clickableLink";

const SearchResults = (props: SearchResultsProps) => {
  const people: UserModel[] | undefined = props.results?.peopleResults;
  const events: EventModel[] | undefined = props.results?.eventResults;
  const categories: CategoryModel[] | undefined = props.results?.categoryResults;

  function renderPeople() {
    let peopleList = [];
    if (people && people.length > 0) {
      for (let i = 0; i < people.length; i++) {
        peopleList.push(
          <ClickableLink
            key={people[i].id}
            onPress={() => props.navigation.navigate("Person", { id: people[i].id! })}
            text={people[i].name}
            textStyle={SearchResultsStyles.resultItem}
          />
        );
      }
      return (
        <View style={SearchResultsStyles.sectionContainer}>
          <Text style={SearchResultsStyles.heading}>People</Text>
          <View>{peopleList}</View>
        </View>
      );
    }
  }

  function renderEvents() {
    let eventList = [];
    if (events && events.length > 0) {
      for (let i = 0; i < events.length; i++) {
        eventList.push(
          <ClickableLink
            key={events[i].id}
            onPress={() => props.navigation.navigate("Event", { id: events[i].id! })}
            text={events[i].name}
            textStyle={SearchResultsStyles.resultItem}
          />
        );
      }
      return (
        <View style={SearchResultsStyles.sectionContainer}>
          <Text style={SearchResultsStyles.heading}>Events</Text>
          <View>{eventList}</View>
        </View>
      );
    }
  }

  function renderCategories() {
    let categoryList = [];
    if (categories && categories.length > 0) {
      for (let i = 0; i < categories.length; i++) {
        categoryList.push(
          <ClickableLink
            key={categories[i].id}
            onPress={() => props.navigation.navigate("Category", { id: categories[i].id! })}
            text={categories[i].name}
            textStyle={SearchResultsStyles.resultItem}
          />
        );
      }
      return (
        <View style={SearchResultsStyles.sectionContainer}>
          <Text style={SearchResultsStyles.heading}>Categories</Text>
          <View>{categoryList}</View>
        </View>
      );
    }
  }

  return (
    <ScrollView style={[CommonStyles.fullWidthScrollView, SearchResultsStyles.container]}>
      {renderPeople()}
      {renderEvents()}
      {renderCategories()}
    </ScrollView>
  );
};

export default SearchResults;
