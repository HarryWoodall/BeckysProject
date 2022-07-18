import React from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import UserModel from "../../../src/models/userModel";
import { getCategory, getEvent, getUser } from "../../../src/services/dataService";
import EventModel from "../../../src/models/eventModel";
import CategoryModel from "../../../src/models/categoryModel";
import { when } from "jest-when";
import Person from "../../../src/views/person";

const mockGetUser = getUser as jest.Mock;
const mockGetCategory = getCategory as jest.Mock;
const mockGetEvent = getEvent as jest.Mock;
jest.mock("../../../src/services/dataService", () => ({
  getUser: jest.fn(),
  getCategory: jest.fn(),
  getEvent: jest.fn(),
}));

describe("person form internal calls", () => {
  const createTestProps = (props: Object) => ({
    route: {
      params: {
        previousScreen: "Homepage",
        id: "pageUserId",
      },
    },
    navigation: {
      navigate: jest.fn(),
      push: jest.fn(),
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
    mutualFriends: ["mutualFriend"],
    category: ["category"],
    lastTalkAbout: "lastTalkAboutString",
    avoidTalkingAbout: "avoidTalkingAboutString",
    notes: "notesString",
    conversationStarters: "conversationStartersString",
    id: "idString",
  };

  const mockEvent: EventModel = {
    name: "EventName1",
    attendees: ["Attendee1"],
    date: "1995-12-17T03:24:00",
    id: mockPersonModel.seenLastEvent,
  };

  const mockCategory: CategoryModel = {
    name: "category",
    people: ["Attendee1"],
    notes: "NotesString",
    id: mockPersonModel.category[0],
  };

  const mockMutualFriend: UserModel = {
    name: "mutualFriend1Name",
    id: "mutualFriend",
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
  };

  beforeEach(() => {
    when(mockGetUser).calledWith("pageUserId").mockResolvedValue(mockPersonModel);
    when(mockGetUser).calledWith("mutualFriend").mockResolvedValue(mockMutualFriend);
    mockGetCategory.mockResolvedValue(mockCategory);
    mockGetEvent.mockResolvedValue(mockEvent);
  });

  afterEach(() => {
    jest.clearAllMocks();
    screen.unmount();
  });

  test("displays UserModel data correctly", async () => {
    let props: any = createTestProps({});

    const { getByText, getAllByText } = render(<Person {...props} />);

    await act(async () => {
      await waitFor(() => expect(mockGetUser).toBeCalledTimes(1));
      await waitFor(() => expect(mockGetCategory).toBeCalledTimes(1));
      await waitFor(() => expect(mockGetEvent).toBeCalledTimes(1));
    });

    expect(getByText(mockPersonModel.name)).toBeDefined();
    expect(getByText(mockPersonModel.pronouns)).toBeDefined();
    expect(getByText(mockPersonModel.nickname)).toBeDefined();
    expect(getByText(mockPersonModel.age)).toBeDefined();
    expect(getByText(mockPersonModel.known)).toBeDefined();
    expect(getByText(new Date(mockPersonModel.seenLast).toLocaleDateString())).toBeDefined();
    expect(getByText(mockPersonModel.lastTalkAbout)).toBeDefined();
    expect(getByText(mockPersonModel.notes)).toBeDefined();
    expect(getByText(mockPersonModel.avoidTalkingAbout)).toBeDefined();
    expect(getByText(mockPersonModel.conversationStarters)).toBeDefined();

    expect(getAllByText(mockMutualFriend.name)).toBeDefined();
    expect(getAllByText(mockEvent.name)).toBeDefined();
    expect(getAllByText(mockCategory.name)).toBeDefined();
  });

  test("Event navigates to correct view", async () => {
    let props: any = createTestProps({});
    const spy = jest.spyOn(props.navigation, "navigate");

    render(<Person {...props} />);

    await act(async () => {
      await waitFor(() => expect(mockGetUser).toBeCalledTimes(1));
      await waitFor(() => expect(mockGetCategory).toBeCalledTimes(1));
      await waitFor(() => expect(mockGetEvent).toBeCalledTimes(1));

      fireEvent.press(screen.getByTestId("PersonEventLink"));
      expect(spy).toHaveBeenCalledWith("Event", { id: mockPersonModel.seenLastEvent });
    });
  });

  test("Category navigates to correct view", async () => {
    let props: any = createTestProps({});
    const spy = jest.spyOn(props.navigation, "push");

    render(<Person {...props} />);

    await act(async () => {
      await waitFor(() => expect(mockGetUser).toBeCalledTimes(1));
      await waitFor(() => expect(mockGetCategory).toBeCalledTimes(1));
      await waitFor(() => expect(mockGetEvent).toBeCalledTimes(1));

      fireEvent.press(screen.getByTestId("CategoryLink-0"));
      expect(spy).toHaveBeenCalledWith("Category", { id: mockPersonModel.category[0] });
    });
  });

  test("MutualFriend navigates to correct view", async () => {
    let props: any = createTestProps({});
    const spy = jest.spyOn(props.navigation, "push");

    render(<Person {...props} />);

    await act(async () => {
      await waitFor(() => expect(mockGetUser).toBeCalledTimes(1));
      await waitFor(() => expect(mockGetCategory).toBeCalledTimes(1));
      await waitFor(() => expect(mockGetEvent).toBeCalledTimes(1));

      fireEvent.press(screen.getByTestId("MutualFriendsLink-0"));
      expect(spy).toHaveBeenCalledWith("Person", { id: mockPersonModel.mutualFriends[0] });
    });
  });
});
