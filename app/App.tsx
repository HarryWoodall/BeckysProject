import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainMenu from "./src/views/mainMenu";
import UserList from "./src/views/userList";
import Homepage from "./src/views/homepage";
import NewPerson from "./src/views/newPerson";
import PersonProfile from "./src/views/personProfile";
import Event from "./src/views/event";
import NewEvent from "./src/views/newEvent";
import Category from "./src/views/category";
import NewCategory from "./src/views/newCategory";
import SearchView from "./src/views/search";
// import { SearchBar } from "react-native-screens";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Homepage" component={Homepage} />
        <Stack.Screen name="Search" component={SearchView} />
        <Stack.Screen name="NewCategory" component={NewCategory} />

        <Stack.Screen name="NewEvent" component={NewEvent} />

        <Stack.Screen name="NewPerson" component={NewPerson} />
        <Stack.Screen name="PersonProfile" component={PersonProfile} />
        <Stack.Screen name="Event" component={Event} />
        <Stack.Screen name="Category" component={Category} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
