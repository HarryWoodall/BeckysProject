import React from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import UserModel from "../../../src/models/userModel";
import { getCategory, getEvent, getUsers } from "../../../src/services/dataService";
import EventModel from "../../../src/models/eventModel";
import CategoryModel from "../../../src/models/categoryModel";
import { when } from "jest-when";
import Person from "../../../src/views/person";
import Event from "../../../src/views/event";
import Category from "../../../src/views/category";

const mockGetUsers = getUsers as jest.Mock;
// const mockGetEvent = getEvent as jest.Mock;
const mockGetCategory = getCategory as jest.Mock;
jest.mock("../../../src/services/dataService", () => ({
  getUsers: jest.fn(),
  getCategory: jest.fn(),
}));

describe("event form internal calls", () => {
  const createTestProps = (props: Object) => ({
    route: {
      params: {
        previousScreen: "Homepage",
        id: "pageCategoryId",
      },
    },
    navigation: {
      navigate: jest.fn(),
      push: jest.fn(),
    },
    ...props,
  });

  const mockCategory: CategoryModel = {
    name: "CategoryName",
    people: ["mockPersonIdString"],
    notes: "NotesString",
    id: "mockCategoryId",
  };

  const mockAttendees: UserModel[] = [
    {
      name: "attendee1",
      id: "mockPersonIdString",
      age: "ageString",
      nickname: "nicknameString",
      pronouns: "pronounsString",
      known: "knownString",
      seenLast: "1995-12-17T03:24:00",
      seenLastEvent: "seenLastEventString",
      mutualFriends: ["mutualFriend"],
      category: ["category1", "category2"],
      lastTalkAbout: "lastTalkAboutString",
      avoidTalkingAbout: "avoidTalkingAboutString",
      notes: "notesString",
      conversationStarters: "conversationStartersString",
    },
  ];

  beforeEach(() => {
    when(mockGetCategory).calledWith("pageCategoryId").mockResolvedValue(mockCategory);
    when(mockGetUsers).calledWith(mockCategory.people).mockResolvedValue(mockAttendees);
    // mockGetEvent.mockResolvedValue(mockEvent);
  });

  afterEach(() => {
    jest.clearAllMocks();
    screen.unmount();
  });

  test("displays CategoryModel data correctly", async () => {
    let props: any = createTestProps({});

    const { getByText, getAllByText } = render(<Category {...props} />);

    await act(async () => {
      await waitFor(() => expect(mockGetCategory).toBeCalledTimes(1));
      await waitFor(() => expect(mockGetUsers).toBeCalledTimes(1));
    });

    screen.debug();

    expect(getByText(mockCategory.name)).toBeDefined();
    expect(getByText(mockCategory.notes)).toBeDefined();
    expect(getAllByText(mockAttendees[0].name)).toBeDefined();
  });

  test("Event navigates to correct view", async () => {
    let props: any = createTestProps({});
    const spy = jest.spyOn(props.navigation, "push");

    render(<Category {...props} />);

    await act(async () => {
      await waitFor(() => expect(mockGetCategory).toBeCalledTimes(1));
      await waitFor(() => expect(mockGetUsers).toBeCalledTimes(1));

      fireEvent.press(screen.getByTestId("PeopleLink-0"));
      expect(spy).toHaveBeenCalledWith("Person", { id: mockCategory.people[0] });
    });
  });
});
