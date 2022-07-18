import React from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import UserModel from "../../../src/models/userModel";
import { getEvent, getUsers } from "../../../src/services/dataService";
import EventModel from "../../../src/models/eventModel";
import { when } from "jest-when";
import Event from "../../../src/views/event";

const mockGetUsers = getUsers as jest.Mock;
const mockGetEvent = getEvent as jest.Mock;
jest.mock("../../../src/services/dataService", () => ({
  getUsers: jest.fn(),
  getEvent: jest.fn(),
}));

describe("event form internal calls", () => {
  const createTestProps = (props: Object) => ({
    route: {
      params: {
        previousScreen: "Homepage",
        id: "pageEventId",
      },
    },
    navigation: {
      navigate: jest.fn(),
      push: jest.fn(),
    },
    ...props,
  });

  const mockEvent: EventModel = {
    name: "EventName",
    attendees: ["mockPersonIdString"],
    date: "1995-12-17T03:24:00",
    id: "eventId",
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
    when(mockGetEvent).calledWith("pageEventId").mockResolvedValue(mockEvent);
    when(mockGetUsers).calledWith(mockEvent.attendees).mockResolvedValue(mockAttendees);
    // mockGetEvent.mockResolvedValue(mockEvent);
  });

  afterEach(() => {
    jest.clearAllMocks();
    screen.unmount();
  });

  test("displays EventModel data correctly", async () => {
    let props: any = createTestProps({});

    const { getByText, getAllByText } = render(<Event {...props} />);

    await act(async () => {
      await waitFor(() => expect(mockGetEvent).toBeCalledTimes(1));
      await waitFor(() => expect(mockGetUsers).toBeCalledTimes(1));
    });

    screen.debug();

    expect(getByText(mockEvent.name)).toBeDefined();
    expect(getByText(new Date(mockEvent.date).toLocaleDateString())).toBeDefined();
    expect(getAllByText(mockAttendees[0].name)).toBeDefined();
  });

  test("Event navigates to correct view", async () => {
    let props: any = createTestProps({});
    const spy = jest.spyOn(props.navigation, "push");

    render(<Event {...props} />);

    await act(async () => {
      await waitFor(() => expect(mockGetEvent).toBeCalledTimes(1));
      await waitFor(() => expect(mockGetUsers).toBeCalledTimes(1));

      fireEvent.press(screen.getByTestId("AttendeeLink-0"));
      expect(spy).toHaveBeenCalledWith("Person", { id: mockEvent.attendees[0] });
    });
  });
});
