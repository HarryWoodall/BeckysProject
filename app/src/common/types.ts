import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { GestureResponderEvent, ImageStyle, TextStyle, ViewStyle } from "react-native";
import CategoryModel from "../models/categoryModel";
import EventModel from "../models/eventModel";
import UserModel from "../models/userModel";

/**
 * Props
 */

export type RootStackParamList = {
  Homepage: undefined;
  Search: undefined;
  Person: { id: string };
  PersonForm: { previousScreen: keyof RootStackParamList; personModel?: UserModel } | undefined;
  Event: { id: string };
  EventForm: { previousScreen: keyof RootStackParamList; eventModel?: EventModel } | undefined;
  Category: { id: string };
  CategoryForm: { previousScreen: keyof RootStackParamList; categoryModel?: CategoryModel } | undefined;
};

export type HomepageProps = NativeStackScreenProps<RootStackParamList, "Homepage">;
export type SearchViewProps = NativeStackScreenProps<RootStackParamList, "Search">;
export type PersonFormProps = NativeStackScreenProps<RootStackParamList, "PersonForm">;
export type PersonProps = NativeStackScreenProps<RootStackParamList, "Person">;
export type EventProps = NativeStackScreenProps<RootStackParamList, "Event">;
export type EventFormProps = NativeStackScreenProps<RootStackParamList, "EventForm">;
export type CategoryProps = NativeStackScreenProps<RootStackParamList, "Category">;
export type CategoryFormProps = NativeStackScreenProps<RootStackParamList, "CategoryForm">;

export type UserCardProps = {
  name: string;
  description: string;
};

export type DefaultButtonProps = {
  text: string;
  onPress: (event: GestureResponderEvent) => void;
  key?: string;
};

export type ClickableLinkProps = {
  text: string;
  onPress: (event: GestureResponderEvent) => void;
  key?: string;
  textStyle?: TextStyle;
  containerStyle?: ViewStyle;
};

export type TextListProps = {
  title: string;
  list: string[] | undefined;
  messageIfEmpty?: string;
};

export type Link = {
  text: string;
  id: string;
};

export type LinkListProps = {
  title: string;
  list: Link[] | undefined;
  linkRoute: keyof RootStackParamList;
  navigation: NativeStackNavigationProp<RootStackParamList>;
  messageIfEmpty?: string;
};

export type DataFieldProps = {
  title: string;
  text: string | undefined;
};

export type SearchResultsProps = {
  results: SearchResults | undefined;
  navigation: NativeStackNavigationProp<RootStackParamList, "Search">;
};

/**
 * Styles
 */
export interface CommonStyles {
  fullWidthView: ViewStyle;
  fullWidthScrollView: ViewStyle;
  heading1: TextStyle;
  heading2: TextStyle;
  text: TextStyle;
  link: TextStyle;
  textbox: ViewStyle;
  textArea: ViewStyle;
  button: ViewStyle;
  buttonPressed: ViewStyle;
  buttonText: TextStyle;
  dateDisplayText: ViewStyle;
  searchBar: ViewStyle;
  dropDownPicker: ViewStyle;
}

export interface HomepageStyles {
  searchBar: ViewStyle;
  addNewButton: ViewStyle;
  icon: ImageStyle;
}

export interface PersonStyles {
  basicInfo: ViewStyle;
  icon: ImageStyle;
  lastSawThemContainer: ViewStyle;
  lastSawThemItem: ViewStyle;
  list: ViewStyle;
  detailInfo: ViewStyle;
}

export interface PersonFormStyles {
  basicInfo: ViewStyle;
  dateAndEventContainer: ViewStyle;
  eventPicker: ViewStyle;
  pickerContainer: ViewStyle;
  selectionsContainer: ViewStyle;
  picker: ViewStyle;
}

export interface SearchResultsStyles {
  container: ViewStyle;
  sectionContainer: ViewStyle;
  heading: TextStyle;
  resultItem: TextStyle;
}

export interface UserCardStyles {
  name: TextStyle;
  description: TextStyle;
  card: ViewStyle;
  image: ImageStyle;
  button: ViewStyle;
}

export interface DefaultButtonStyles {
  button: ViewStyle;
  text: TextStyle;
}

export interface ClickableLinkStyles {
  text: TextStyle;
}

export interface TextListStyle {
  title: TextStyle;
  link: TextStyle;
  text: TextStyle;
  container: ViewStyle;
}

export interface DataFieldStyle {
  title: TextStyle;
  text: TextStyle;
  container: ViewStyle;
}

/**
 * Schemas
 */

export interface SearchResults {
  peopleResults: UserModel[];
  eventResults: EventModel[];
  categoryResults: CategoryModel[];
}
