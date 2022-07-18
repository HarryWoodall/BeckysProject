import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import { EventsModel, UsersModel, CategoryModel } from "./__mocks__/models/models";

global.fetch = require("jest-fetch-mock");
Enzyme.configure({ adapter: new Adapter() });

mockAsyncStorage.getItem = jest.fn((key, callback) => {
  // do something here to retrieve data
  if (callback) callback();

  if (key == "@users") {
    return new Promise((resolve, reject) => {
      resolve(JSON.stringify(UsersModel));
    });
  }

  if (key == "@events") {
    return new Promise((resolve, reject) => {
      resolve(JSON.stringify(EventsModel));
    });
  }

  if (key == "@categories") {
    return new Promise((resolve, reject) => {
      resolve(JSON.stringify(CategoryModel));
    });
  }

  return new Promise((resolve, reject) => {
    resolve(null);
  });
});

jest.useFakeTimers();
jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);
jest.mock("@react-navigation/native", () => {
  return {
    useIsFocused: jest.fn(),
  };
});
