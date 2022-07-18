import React from "react";
import { render, waitFor, screen, act, fireEvent } from "@testing-library/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EventModel from "../../../src/models/eventModel";
import EventForm from "../../../src/views/eventForm";

describe("event form external calls", () => {
  const createTestProps = (props: Object) => ({
    route: {
      params: {
        previousScreen: "Homepage",
        eventModel: mockEvent,
      },
    },
    ...props,
  });

  const mockEvent: EventModel = {
    name: "EventName1",
    date: "1995-12-17T03:24:00",
    attendees: ["Attendee1"],
    id: "EventId",
  };

  afterEach(() => {
    jest.clearAllMocks();
    screen.unmount();
  });

  test("asyncStorage should be called to retrieve data", async () => {
    let props: any = createTestProps({});

    render(<EventForm {...props} />);

    await waitFor(() => expect(AsyncStorage.getItem).toBeCalledTimes(1));
    await waitFor(() => expect(AsyncStorage.getItem).toBeCalledWith("@users"));
  });

  test("asyncStorage should be called to update data", async () => {
    let props: any = createTestProps({});

    render(<EventForm {...props} />);

    let mockUpdatedModelEvent = Object.assign({}, mockEvent);
    mockUpdatedModelEvent.date = new Date(mockUpdatedModelEvent.date).toString();

    await act(async () => {
      await waitFor(() => expect(AsyncStorage.getItem).toBeCalledTimes(1));
      fireEvent.press(screen.getByTestId("SaveEventButton"));

      await waitFor(() => expect(AsyncStorage.setItem).toBeCalledTimes(1));
      await waitFor(() => expect(AsyncStorage.setItem).toBeCalledWith("@events", JSON.stringify([mockUpdatedModelEvent])));
    });
  });

  test("asyncStorage should be called to create data", async () => {
    let props: any = createTestProps({});
    props.route.params.personModel = null;

    render(<EventForm {...props} />);

    let mockUpdatedModelPerson = Object.assign({}, mockEvent);
    mockUpdatedModelPerson.date = new Date(mockUpdatedModelPerson.date).toString();

    await act(async () => {
      await waitFor(() => expect(AsyncStorage.getItem).toBeCalledTimes(1));
      fireEvent.press(screen.getByTestId("SaveEventButton"));

      await waitFor(() => expect(AsyncStorage.setItem).toBeCalledTimes(1));
      await waitFor(() => expect(AsyncStorage.setItem).toBeCalledWith("@events", expect.stringContaining("EventId")));
    });
  });
});
