import { StoriesCarousel } from "@/FakeData/data";
import { ImageList } from "@/FakeData/imagesList";
import React from "react";

export const UserStoryContext = React.createContext<any>(null);
export const UserStoryContextDispatch = React.createContext<any>(null);

export const userStoriesList = StoriesCarousel();
export const userStoryData: any = ImageList();

export const mockUserStoryContext = {
  userStory: userStoryData[userStoriesList[2].id],
  userStoriesList,
  currentStoryIndex: 0,
  currentAvatarMetaData: userStoriesList[2],
  nextAvatarMetaData: userStoriesList[3],
  prevAvatarMetaData: userStoriesList[1],
};

export const mockUserStoryDispatch = jest.fn();
