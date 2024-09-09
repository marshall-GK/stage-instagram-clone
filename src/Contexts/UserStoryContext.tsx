import {
  defaultStoriesReducerState,
  StoriesReducer,
} from "@/Reducers/storiesReducer";
import React, { createContext, useReducer } from "react";

export const UserStoryContext = createContext<typeof defaultStoriesReducerState>(defaultStoriesReducerState);
export const UserStoryContextDispatch = createContext<any>(null);

export const UserStoryContextProvider = ({children}: any) => {
  const [reducer, dispatch] = useReducer(
    StoriesReducer,
    defaultStoriesReducerState
  );
  return (
    <UserStoryContext.Provider value={reducer}>
      <UserStoryContextDispatch.Provider value={dispatch}>
        {children}
      </UserStoryContextDispatch.Provider>
    </UserStoryContext.Provider>
  );
};
