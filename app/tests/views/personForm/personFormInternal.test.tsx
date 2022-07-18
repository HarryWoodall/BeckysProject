import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react-native";
import PersonForm from "../../../src/views/personForm";
import UserModel from "../../../src/models/userModel";
import { getAllCategorys, getAllEvents, getAllUsers } from "../../../src/services/dataService";
import EventModel from "../../../src/models/eventModel";
import CategoryModel from "../../../src/models/categoryModel";

const mockGetAllUsers = getAllUsers as jest.Mock;
const mockGetAllCategories = getAllCategorys as jest.Mock;
const mockGetAllEvents = getAllEvents as jest.Mock;
jest.mock("../../../src/services/dataService", () => ({
  getAllUsers: jest.fn(),
  getAllCategorys: jest.fn(),
  getAllEvents: jest.fn(),
}));

describe("person form internal calls", () => {
  const createTestProps = (props: Object) => ({
    route: {
      params: {
        previousScreen: "Homepage",
        personModel: mockPersonModel,
      },
    },
    ...props,
  });

  const mockPersonModel: UserModel = {
    name: "nameString",
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
    id: "idString",
  };

  const mockEvents: EventModel[] = [
    {
      name: "EventName1",
      attendees: ["Attendee1"],
      date: "1995-12-17T03:24:00",
      id: mockPersonModel.seenLastEvent,
    },
    {
      name: "EventName1",
      attendees: ["Attendee1"],
      date: "1995-12-17T03:24:00",
      id: "AnotherId",
    },
  ];

  const mockCategories: CategoryModel[] = [
    {
      name: "EventName1",
      people: ["Attendee1"],
      notes: "NotesString",
      id: mockPersonModel.category[0],
    },
    {
      name: "EventName2",
      people: ["Attendee1"],
      notes: "NotesString",
      id: mockPersonModel.category[1],
    },
  ];

  const mockMutualFriends: UserModel[] = [
    {
      name: "mutualFriend1Name",
      id: "mutualFriend1",
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
      id: "mutualFriend2",
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

  test("displays UserModel data correctly", async () => {
    let props: any = createTestProps({});

    mockGetAllUsers.mockResolvedValue(mockMutualFriends);
    mockGetAllCategories.mockResolvedValue(mockCategories);
    mockGetAllEvents.mockResolvedValue(mockEvents);

    render(<PersonForm {...props} />);

    await act(async () => {
      await waitFor(() => expect(mockGetAllUsers).toBeCalledTimes(1));
      await waitFor(() => expect(mockGetAllCategories).toBeCalledTimes(1));
      await waitFor(() => expect(mockGetAllEvents).toBeCalledTimes(1));
    });

    expect(screen.getByTestId("PronounsInput").props.value).toBe(mockPersonModel.pronouns);
    expect(screen.getByTestId("NameInput").props.value).toBe(mockPersonModel.name);
    expect(screen.getByTestId("NicknameInput").props.value).toBe(mockPersonModel.nickname);
    expect(screen.getByTestId("AgeInput").props.value).toBe(mockPersonModel.age);
    expect(screen.getByTestId("KnownInput").props.value).toBe(mockPersonModel.known);
    expect(screen.getByText(new Date(mockPersonModel.seenLast).toLocaleDateString())).toBeDefined();
    expect(screen.getByTestId("TalkAboutLastInput").props.value).toBe(mockPersonModel.lastTalkAbout);
    expect(screen.getByTestId("AvoidTalkingInput").props.value).toBe(mockPersonModel.avoidTalkingAbout);
    expect(screen.getByTestId("NotesInput").props.value).toBe(mockPersonModel.notes);
    expect(screen.getByTestId("ConversationStartersInput").props.value).toBe(mockPersonModel.conversationStarters);

    expect(screen.getAllByText(mockMutualFriends.find((user) => user.id == mockPersonModel.mutualFriends[0])!.name)).toBeDefined();
    expect(screen.getAllByText(mockMutualFriends.find((user) => user.id == mockPersonModel.mutualFriends[1])!.name)).toBeDefined();
    expect(screen.getAllByText(mockCategories.find((category) => category.id == mockPersonModel.category[0])!.name)).toBeDefined();
    expect(screen.getAllByText(mockCategories.find((category) => category.id == mockPersonModel.category[1])!.name)).toBeDefined();
    expect(screen.getAllByText(mockEvents.find((event) => event.id == mockPersonModel.seenLastEvent)!.name)).toBeDefined();
  });
});
