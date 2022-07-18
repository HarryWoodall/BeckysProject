import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react-native";
import UserModel from "../../../src/models/userModel";
import { getAllUsers } from "../../../src/services/dataService";
import EventModel from "../../../src/models/eventModel";
import EventForm from "../../../src/views/eventForm";

const mockGetAllUsers = getAllUsers as jest.Mock;
jest.mock("../../../src/services/dataService", () => ({
  getAllUsers: jest.fn(),
}));

describe("event form internal calls", () => {
  const createTestProps = (props: Object) => ({
    route: {
      params: {
        previousScreen: "Homepage",
        eventModel: mockEventModel,
      },
    },
    ...props,
  });

  const mockEventModel: EventModel = {
    name: "EventName1",
    date: "1995-12-17T03:24:00",
    attendees: ["attendee1", "attendee2"],
    id: "EventId",
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

    render(<EventForm {...props} />);

    await act(async () => {
      await waitFor(() => expect(mockGetAllUsers).toBeCalledTimes(1));
    });

    expect(screen.getByTestId("EventName").props.value).toBe(mockEventModel.name);
    expect(screen.getByText(new Date(mockEventModel.date).toLocaleDateString())).toBeDefined();

    expect(screen.getAllByText(mockAttendees.find((user) => user.id == mockEventModel.attendees[0])!.name)).toBeDefined();
    expect(screen.getAllByText(mockAttendees.find((user) => user.id == mockEventModel.attendees[1])!.name)).toBeDefined();
  });
});
