import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Story from "@/app/stories/[userId]/[storyId]/page";
import { mockUserStoryContext, mockUserStoryDispatch } from "./contextMocks";
import useRouter from "./routerMocks";
import { ReducerActionType } from "@/Reducers/actions";
import { UserStoryContextProvider } from "@/Contexts/UserStoryContext";
import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
  useParams: () => ({
    storyId: "3s1",
  }),
}));

jest.mock("@/_common/utils", () => ({
  computerAvatarMetaData: jest.fn(),
  computeTouchDragDirection: jest.fn(),
}));

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useReducer: jest.fn(),
}));

describe("Story Component", () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    await waitFor(() =>
      (React.useReducer as jest.Mock).mockImplementation(
        (reducer, initialState) => [mockUserStoryContext, mockUserStoryDispatch]
      )
    );
    render(
      <UserStoryContextProvider>
        <Story />
      </UserStoryContextProvider>
    );
  });

  test("renders story image and progress bar", async () => {
    await waitFor(async () => {
      expect(screen.getByTestId("storyImage")).toHaveAttribute(
        "data-teststoryurl",
        mockUserStoryContext?.userStory[0]?.storyUrl
      );
    });
    expect(screen.getByText("Prev")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  test('navigates to the next story on "Next" click', async () => {
    fireEvent.click(screen.getByText("Next"));

    await waitFor(() => {
      expect(mockUserStoryDispatch).toHaveBeenCalledWith({
        type: ReducerActionType.CURRENT_STORY_INDEX,
        payload: 1,
      });
    });
    await waitFor(() => {
      expect(screen.getByTestId("storyImage")).toBeInTheDocument();
    });
  });

  test('navigates to the previous story on "Prev" click', async () => {
    fireEvent.click(screen.getByText("Prev"));
    await waitFor(() => {
      expect(mockUserStoryDispatch).toHaveBeenCalledWith({
        type: ReducerActionType.CURRENT_STORY_INDEX,
        payload: 0,
      });
    });
  });
});
