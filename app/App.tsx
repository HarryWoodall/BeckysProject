import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Homepage from "./src/views/homepage";
import PersonForm from "./src/views/personForm";
import Person from "./src/views/person";
import Event from "./src/views/event";
import EventForm from "./src/views/eventForm";
import Category from "./src/views/category";
import CategoryForm from "./src/views/categoryForm";
import SearchView from "./src/views/search";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Homepage" component={Homepage} />
        <Stack.Screen name="Search" component={SearchView} />
        <Stack.Screen name="CategoryForm" component={CategoryForm} />
        <Stack.Screen name="EventForm" component={EventForm} />
        <Stack.Screen name="PersonForm" component={PersonForm} />
        <Stack.Screen name="Person" component={Person} />
        <Stack.Screen name="Event" component={Event} />
        <Stack.Screen name="Category" component={Category} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
