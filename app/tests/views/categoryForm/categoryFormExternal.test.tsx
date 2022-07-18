import React from "react";
import { render, waitFor, screen, act, fireEvent } from "@testing-library/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EventForm from "../../../src/views/eventForm";
import CategoryModel from "../../../src/models/categoryModel";
import CategoryForm from "../../../src/views/categoryForm";

describe("event form external calls", () => {
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
    name: "CategoryName",
    people: ["attendee1", "attendee2"],
    notes: "NotesString",
    id: "CategoryId",
  };

  afterEach(() => {
    jest.clearAllMocks();
    screen.unmount();
  });

  test("asyncStorage should be called to retrieve data", async () => {
    let props: any = createTestProps({});

    render(<CategoryForm {...props} />);

    await waitFor(() => expect(AsyncStorage.getItem).toBeCalledTimes(1));
    await waitFor(() => expect(AsyncStorage.getItem).toBeCalledWith("@users"));
  });

  test("asyncStorage should be called to update data for CategoryForm", async () => {
    let props: any = createTestProps({});
    // props.route.params.categoryModel = null;

    render(<CategoryForm {...props} />);

    await act(async () => {
      await waitFor(() => expect(AsyncStorage.getItem).toBeCalledTimes(1));
      fireEvent.press(screen.getByTestId("SaveCategoryButton"));

      await waitFor(() => expect(AsyncStorage.setItem).toBeCalledTimes(1));
      await waitFor(() => expect(AsyncStorage.setItem).toHaveBeenNthCalledWith(1, "@categories", JSON.stringify([mockCategoryModel])));
    });
  });

  test("asyncStorage should be called to create data", async () => {
    let props: any = createTestProps({});
    props.route.params.categoryModel = null;

    render(<CategoryForm {...props} />);

    await act(async () => {
      await waitFor(() => expect(AsyncStorage.getItem).toBeCalledTimes(1));
      fireEvent.press(screen.getByTestId("SaveCategoryButton"));

      await waitFor(() => expect(AsyncStorage.setItem).toBeCalledTimes(1));
      await waitFor(() => expect(AsyncStorage.setItem).toBeCalledWith("@categories", expect.stringContaining("CategoryId")));
    });
  });
});
