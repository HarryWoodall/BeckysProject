import { StyleSheet, Text, View, Button } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileProps } from "../common/types";

const MainMenu = ({ navigation }: ProfileProps) => {
  return <Button title="User List" onPress={() => navigation.navigate("UserList")} />;
};

export default MainMenu;
