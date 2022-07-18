import React from "react";
import { act, fireEvent, render, waitFor, screen } from "@testing-library/react-native";
import PersonForm from "../../../src/views/personForm";
import UserModel from "../../../src/models/userModel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { when } from "jest-when";
import { UsersModel as externalMockUser } from "../../__mocks__/models/models";

// jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

describe("person form external calls", () => {
  const createTestProps = (props: Object) => ({
    route: {
      params: {
        previousScreen: "Homepage",
        personModel: mockPersonModel,
      },
    },
    navigation: {
      navigate: jest.fn(),
      push: jest.fn(),
    },
    ...props,
  });

  let mockPersonModel: UserModel = {
    pronouns: "pronounsString",
    name: "nameString",
    nickname: "nicknameString",
    age: "ageString",
    known: "knownString",
    seenLast: "1995-12-17T03:24:00",
    seenLastEvent: "seenLastEventString",
    mutualFriends: ["mutualFriend1", "mutualFriend2"],
    category: ["category1", "category2"],
    lastTalkAbout: "lastTalkAboutString",
    avoidTalkingAbout: "avoidTalkingAboutString",
    notes: "notesString",
    conversationStarters: "conversationStartersString",
    id: "idString",
  };

  afterEach(() => {
    jest.clearAllMocks();
    screen.unmount();
  });

  test("asyncStorage should be called to retrieve data", async () => {
    let props: any = createTestProps({});

    render(<PersonForm {...props} />);

    await waitFor(() => expect(AsyncStorage.getItem).toBeCalledTimes(3));
    await waitFor(() => expect(AsyncStorage.getItem).toBeCalledWith("@users"));
    await waitFor(() => expect(AsyncStorage.getItem).toBeCalledWith("@categories"));
    await waitFor(() => expect(AsyncStorage.getItem).toBeCalledWith("@events"));
  });

  test("asyncStorage should be called to update data", async () => {
    let props: any = createTestProps({});

    render(<PersonForm {...props} />);

    let mockUpdatedModelPerson = Object.assign({}, mockPersonModel);
    mockUpdatedModelPerson.seenLast = new Date(mockUpdatedModelPerson.seenLast).toString();

    await act(async () => {
      await waitFor(() => expect(AsyncStorage.getItem).toBeCalledTimes(3));
      fireEvent.press(screen.getByTestId("SaveUserButton"));

      await waitFor(() => expect(AsyncStorage.setItem).toBeCalledTimes(1));
      await waitFor(() => expect(AsyncStorage.setItem).toBeCalledWith("@users", JSON.stringify([mockUpdatedModelPerson])));
    });
  });

  test("asyncStorage should be called to create data", async () => {
    let props: any = createTestProps({});
    props.route.params.personModel = null;

    render(<PersonForm {...props} />);

    let mockUpdatedModelPerson = Object.assign({}, mockPersonModel);
    mockUpdatedModelPerson.seenLast = new Date(mockUpdatedModelPerson.seenLast).toString();

    await act(async () => {
      await waitFor(() => expect(AsyncStorage.getItem).toBeCalledTimes(3));
      fireEvent.press(screen.getByTestId("SaveUserButton"));

      await waitFor(() => expect(AsyncStorage.setItem).toBeCalledTimes(1));
      await waitFor(() => expect(AsyncStorage.setItem).toBeCalledWith("@users", expect.stringContaining("idString")));
    });
  });
});
