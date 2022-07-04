import AsyncStorage from "@react-native-async-storage/async-storage";
import UserModel from "../models/userModel";
import { v4 as uuid } from "uuid";
import EventModel from "../models/eventModel";
import CategoryModel from "../models/categoryModel";
import { SearchResults } from "../common/types";

const USER_KEY = "@users";
const EVENT_KEY = "@events";
const CATEGORY_KEY = "@categories";

/**
 * Initializers
 */

async function initUserData() {
  try {
    await AsyncStorage.setItem(USER_KEY, "[]");
  } catch (e) {
    console.log(e);
  }
}

async function initEventData() {
  try {
    await AsyncStorage.setItem(EVENT_KEY, "[]");
  } catch (e) {
    console.log(e);
  }
}

async function initCategoryData() {
  try {
    await AsyncStorage.setItem(CATEGORY_KEY, "[]");
  } catch (e) {
    console.log(e);
  }
}

/**
 * User Functions
 */

export const storeUser = async (value: UserModel) => {
  try {
    let userData = await AsyncStorage.getItem(USER_KEY);

    if (!userData) {
      await initUserData();
      userData = "[]";
    }

    let userList = JSON.parse(userData!) as UserModel[];

    value.id = uuid();
    userList.push(value);

    await AsyncStorage.setItem(USER_KEY, JSON.stringify(userList));

    console.log("user stored successfully");
  } catch (e) {
    console.log(e);
  }
};

export const getUser = async (key: string): Promise<UserModel | undefined> => {
  try {
    let userData = await AsyncStorage.getItem(USER_KEY);
    let userList = JSON.parse(userData!) as UserModel[];
    return userList.find((user) => user.id == key);
  } catch (e) {
    console.log(e);
  }
};

export const getUsers = async (keys: string[]): Promise<UserModel[] | undefined> => {
  try {
    let userData = await AsyncStorage.getItem(USER_KEY);
    let userList = JSON.parse(userData!) as UserModel[];
    return userList.filter((user) => keys.includes(user.id!));
  } catch (e) {
    console.log(e);
  }
};

export const getAllUsers = async (): Promise<UserModel[] | undefined> => {
  try {
    let userData = await AsyncStorage.getItem(USER_KEY);
    return JSON.parse(userData!) as UserModel[];
  } catch (e) {
    console.log(e);
  }
};

export const removeUser = async (key: string) => {
  try {
    const userData = await AsyncStorage.getItem(USER_KEY);
    const userList = JSON.parse(userData!) as UserModel[];
    const userToRemove = userList.find((user) => user.id == key);

    if (userToRemove) {
      let index = userList.indexOf(userToRemove);
      userList.splice(index, 1);
    }

    await AsyncStorage.setItem(`@users`, JSON.stringify(userList));

    console.log("successfully removed " + userToRemove?.name);
  } catch (e) {
    console.log(e);
  }
};

export const removeAllUsers = async () => {
  await AsyncStorage.removeItem(USER_KEY);
  console.log("All users removed");
};

/**
 * Event Functions
 */

export const storeEvent = async (value: EventModel) => {
  try {
    let eventData = await AsyncStorage.getItem(EVENT_KEY);

    if (!eventData) {
      await initEventData();
      eventData = "[]";
    }

    let eventList = JSON.parse(eventData!) as EventModel[];

    value.id = uuid();
    eventList.push(value);

    await AsyncStorage.setItem(EVENT_KEY, JSON.stringify(eventList));

    console.log("Event stored successfully");
  } catch (e) {
    console.log(e);
  }
};

export const getEvent = async (key: string): Promise<EventModel | undefined> => {
  try {
    let eventData = await AsyncStorage.getItem(EVENT_KEY);
    let eventList = JSON.parse(eventData!) as EventModel[];
    console.log(eventData);
    console.log(key);

    return eventList.find((event) => event.id == key);
  } catch (e) {
    console.log(e);
  }
};

export const getAllEvents = async (): Promise<EventModel[] | undefined> => {
  try {
    let eventData = await AsyncStorage.getItem(EVENT_KEY);
    return JSON.parse(eventData!) as EventModel[];
  } catch (e) {
    console.log(e);
  }
};

export const removeEvent = async (key: string) => {
  try {
    const eventData = await AsyncStorage.getItem(EVENT_KEY);
    const eventList = JSON.parse(eventData!) as EventModel[];
    const eventToRemove = eventList.find((event) => event.id == key);

    if (eventToRemove) {
      let index = eventList.indexOf(eventToRemove);
      eventList.splice(index, 1);
    }

    await AsyncStorage.setItem(EVENT_KEY, JSON.stringify(eventList));

    console.log("successfully removed " + eventToRemove?.name);
  } catch (e) {
    console.log(e);
  }
};

export const removeAllEvents = async () => {
  await AsyncStorage.removeItem(EVENT_KEY);
  console.log("All events removed");
};

/**
 *  Category Functions
 */

export const storeCategory = async (value: CategoryModel) => {
  try {
    let categoryData = await AsyncStorage.getItem(CATEGORY_KEY);

    if (!categoryData) {
      await initCategoryData();
      categoryData = "[]";
    }

    let categoryList = JSON.parse(categoryData!) as CategoryModel[];

    value.id = uuid();
    categoryList.push(value);

    await AsyncStorage.setItem(CATEGORY_KEY, JSON.stringify(categoryList));

    console.log("Category stored successfully");
  } catch (e) {
    console.log(e);
  }
};

export const getCategory = async (key: string): Promise<CategoryModel | undefined> => {
  try {
    let categoryData = await AsyncStorage.getItem(CATEGORY_KEY);
    let categoryList = JSON.parse(categoryData!) as CategoryModel[];
    console.log(categoryData);
    console.log(key);

    return categoryList.find((category) => category.id == key);
  } catch (e) {
    console.log(e);
  }
};

export const getAllCategorys = async (): Promise<CategoryModel[] | undefined> => {
  try {
    let categoryData = await AsyncStorage.getItem(CATEGORY_KEY);
    return JSON.parse(categoryData!) as CategoryModel[];
  } catch (e) {
    console.log(e);
  }
};

export const removeCategory = async (key: string) => {
  try {
    const categoryData = await AsyncStorage.getItem(CATEGORY_KEY);
    const categoryList = JSON.parse(categoryData!) as CategoryModel[];
    const categoryToRemove = categoryList.find((category) => category.id == key);

    if (categoryToRemove) {
      let index = categoryList.indexOf(categoryToRemove);
      categoryList.splice(index, 1);
    }

    await AsyncStorage.setItem(CATEGORY_KEY, JSON.stringify(categoryList));

    console.log("successfully removed " + categoryToRemove?.name);
  } catch (e) {
    console.log(e);
  }
};

export const removeAllCategories = async () => {
  await AsyncStorage.removeItem(CATEGORY_KEY);
  console.log("All categories removed");
};

/**
 *  SearchFunctions
 */

export const searchAll = async (searchTerm: string): Promise<SearchResults> => {
  switch (searchTerm.toLowerCase()) {
    case ":all":
      return {
        peopleResults: (await getAllUsers()) || [],
        eventResults: (await getAllEvents()) || [],
        categoryResults: (await getAllCategorys()) || [],
      };
    case ":people":
      return {
        peopleResults: (await getAllUsers()) || [],
        eventResults: [],
        categoryResults: [],
      };
    case ":events":
      return {
        peopleResults: [],
        eventResults: (await getAllEvents()) || [],
        categoryResults: [],
      };
    case ":categories":
      return {
        peopleResults: [],
        eventResults: [],
        categoryResults: (await getAllCategorys()) || [],
      };
  }

  return {
    peopleResults: (await searchPeople(searchTerm.toLowerCase())) || [],
    eventResults: (await searchEvents(searchTerm.toLowerCase())) || [],
    categoryResults: (await searchCategories(searchTerm.toLowerCase())) || [],
  };
};

export const searchPeople = async (searchTerm: string): Promise<UserModel[] | undefined> => {
  try {
    let personData = await AsyncStorage.getItem(USER_KEY);
    let people = JSON.parse(personData!) as UserModel[];

    return people.filter((person) => person.name.toLowerCase().includes(searchTerm));
  } catch (e) {
    console.log(e);
  }
};

export const searchEvents = async (searchTerm: string): Promise<EventModel[] | undefined> => {
  try {
    let eventData = await AsyncStorage.getItem(EVENT_KEY);
    let events = JSON.parse(eventData!) as EventModel[];

    return events.filter((event) => event.name.toLowerCase().includes(searchTerm));
  } catch (e) {
    console.log(e);
  }
};

export const searchCategories = async (searchTerm: string): Promise<CategoryModel[] | undefined> => {
  try {
    let categoryData = await AsyncStorage.getItem(CATEGORY_KEY);
    let categories = JSON.parse(categoryData!) as CategoryModel[];

    return categories.filter((category) => category.name.toLowerCase().includes(searchTerm));
  } catch (e) {
    console.log(e);
  }
};
