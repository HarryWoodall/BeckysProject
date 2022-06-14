import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ImageStyle, TextStyle, ViewStyle } from "react-native";

export type RootStackParamList = {
  Homepage: undefined;
  NewPerson: undefined;
  Profile: { userId: string };
  Feed: { sort: "latest" | "top" } | undefined;
  UserList: undefined;
};

export type ProfileProps = NativeStackScreenProps<RootStackParamList, "Profile">;
export type HomepageProps = NativeStackScreenProps<RootStackParamList, "Homepage">;
export type NewPersonProps = NativeStackScreenProps<RootStackParamList, "NewPerson">;

export type userCardProps = {
  name: string;
  description: string;
};

export interface CommonStyles {
  fullWidthView: ViewStyle;
  button: ViewStyle;
  buttonPressed: ViewStyle;
  buttonText: TextStyle;
}

export interface HomepageStyles {
  searchBar: ViewStyle;
  addNewButton: ViewStyle;
  icon: ImageStyle;
}

export interface UserCardStyles {
  name: TextStyle;
  description: TextStyle;
  card: ViewStyle;
  image: ImageStyle;
  button: ViewStyle;
}
