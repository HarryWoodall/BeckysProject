import AsyncStorage from "@react-native-async-storage/async-storage";
import UserModel from "../models/userModel";
import { v4 as uuid } from "uuid";

export const storeUser = async (value: UserModel) => {
  try {
    let userData = await AsyncStorage.getItem("@users");

    if (!userData) {
      await initUserData();
      userData = "[]";
    }

    let userList = JSON.parse(userData!) as UserModel[];

    value.id = uuid();
    userList.push(value);

    await AsyncStorage.setItem(`@users`, JSON.stringify(userList));

    console.log("done");
    console.log(userList);
  } catch (e) {
    console.log(e);
  }
};

export const getUser = async (key: string): Promise<UserModel> => {
  return AsyncStorage.getItem(`@user:${key}`).then((json) => {
    return JSON.parse(json!) as UserModel;
  });
};

async function initUserData() {
  try {
    await AsyncStorage.setItem("@users", "[]");
  } catch (e) {
    console.log(e);
  }
}
