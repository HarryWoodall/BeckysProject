import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Pressable, Image, SectionList, TextInput } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { SearchViewProps, SearchResults } from "../common/types";
import UserModel from "../models/userModel";
import { searchAll } from "../services/dataService";
import CommonStyles from "../styles/common";
import EventModel from "../models/eventModel";
import CategoryModel from "../models/categoryModel";
import SearchResultsPartial from "../partials/searchResults";

const SearchView = ({ navigation }: SearchViewProps) => {
  const isFocused = useIsFocused();

  const [searchTerm, setSearchTerm] = useState<string>(":all");
  const [people, setPeople] = useState<UserModel[]>();
  const [events, setEvents] = useState<EventModel[]>();
  const [categories, setCategories] = useState<CategoryModel[]>();
  const [searchResults, setSearchResults] = useState<SearchResults>();

  useEffect(() => {
    handleSearch(searchTerm);
  }, [isFocused]);

  const handleSearch = (searchTerm: string) => {
    if (searchTerm.length > 1) {
      async function search() {
        setSearchResults(await searchAll(searchTerm));
      }

      search();
    } else {
      setSearchResults(undefined);
    }
  };

  return (
    <View style={CommonStyles.fullWidthView}>
      <TextInput onChangeText={(newText) => handleSearch(newText)} placeholder="Search" style={CommonStyles.searchBar} />
      <SearchResultsPartial results={searchResults} navigation={navigation} />
    </View>
  );
};

export default SearchView;
