import { View } from "react-native";
import UserCard from "../components/userCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserInput from "../components/userInput";

const UserList = () => {
  return (
    <View>
      {/* <UserCard name="Name" description="Description" />
      <UserCard name="Name" description="Description" />
      <UserCard name="Name" description="Description" /> */}
      <UserInput />
    </View>
  );
};

export default UserList;
