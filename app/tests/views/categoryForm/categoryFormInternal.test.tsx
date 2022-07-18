import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react-native";
import UserModel from "../../../src/models/userModel";
import { getAllUsers } from "../../../src/services/dataService";
import EventModel from "../../../src/models/eventModel";
import EventForm from "../../../src/views/eventForm";
import CategoryModel from "../../../src/models/categoryModel";
import CategoryForm from "../../../src/views/categoryForm";

const mockGetAllUsers = getAllUsers as jest.Mock;
jest.mock("../../../src/services/dataService", () => ({
  getAllUsers: jest.fn(),
}));

describe("event form internal calls", () => {
  const createTestProps = (props: Object) => ({
    route: {
      params: {
        previousScreen: "Homepage",
        categoryModel: mockCategoryModel,
      },
    },
    ...props,
  });

  const mockCategoryModel: CategoryModel = {
    name: "EventName1",
    people: ["attendee1", "attendee2"],
    notes: "NotesString",
    id: "mockCategoryId",
  };

  const mockAttendees: UserModel[] = [
    {
      name: "mutualFriend1Name",
      id: "attendee1",
      age: "ageString",
      nickname: "nicknameString",
      pronouns: "pronounsString",
      known: "knownString",
      seenLast: "1995-12-17T03:24:00",
      seenLastEvent: "seenLastEventString",
      mutualFriends: ["mutualFriend1", "mutualFriend2"],
      category: ["category1", "category2"],
      lastTalkAbout: "lastTalkAboutString",
      avoidTalkingAbout: "avoidTalkingAboutString",
      notes: "notesString",
      conversationStarters: "conversationStartersString",
    },
    {
      name: "mutualFriend2Name",
      id: "attendee2",
      age: "ageString",
      nickname: "nicknameString",
      pronouns: "pronounsString",
      known: "knownString",
      seenLast: "1995-12-17T03:24:00",
      seenLastEvent: "seenLastEventString",
      mutualFriends: ["mutualFriend1", "mutualFriend2"],
      category: ["category1", "category2"],
      lastTalkAbout: "lastTalkAboutString",
      avoidTalkingAbout: "avoidTalkingAboutString",
      notes: "notesString",
      conversationStarters: "conversationStartersString",
    },
  ];

  afterEach(() => {
    jest.clearAllMocks();
    screen.unmount();
  });

  test("displays EventModel data correctly", async () => {
    let props: any = createTestProps({});

    mockGetAllUsers.mockResolvedValue(mockAttendees);

    render(<CategoryForm {...props} />);

    await act(async () => {
      await waitFor(() => expect(mockGetAllUsers).toBeCalledTimes(1));
    });

    expect(screen.getByTestId("CategoryNameInput").props.value).toBe(mockCategoryModel.name);
    expect(screen.getByTestId("NotesInput").props.value).toBe(mockCategoryModel.notes);

    expect(screen.getAllByText(mockAttendees.find((user) => user.id == mockCategoryModel.people[0])!.name)).toBeDefined();
    expect(screen.getAllByText(mockAttendees.find((user) => user.id == mockCategoryModel.people[1])!.name)).toBeDefined();
  });
});
