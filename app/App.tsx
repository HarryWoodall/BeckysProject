import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainMenu from "./src/views/mainMenu";
import UserList from "./src/views/userList";
import Homepage from "./src/views/homepage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NewPerson from "./src/views/newPerson";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="MainMenu" component={MainMenu} options={{ title: "Welcome" }} /> */}
        {/* <Stack.Screen name="Homepage" component={Homepage} /> */}
        <Stack.Screen name="NewPerson" component={NewPerson} />
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
