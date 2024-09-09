import { ReducerActionType } from "@/Reducers/actions";

export const computerAvatarMetaData = ({
  userStoryDispatch,
  userStoriesList,
  id,
}: any) => {
  const targetStoryIndex = userStoriesList.findIndex(
    (story: any) => story.id === id
  );
  userStoryDispatch({
    type: ReducerActionType.CURRENT_AVATAR_META_DATA,
    payload: userStoriesList[targetStoryIndex],
  });

  userStoryDispatch({
    type: ReducerActionType.NEXT_AVATAR_META_DATA,
    payload:
      targetStoryIndex > 0 && targetStoryIndex < userStoriesList?.length - 1
        ? userStoriesList[targetStoryIndex + 1]
        : {},
  });

  userStoryDispatch({
    type: ReducerActionType.PREV_AVATAR_META_DATA,
    payload:
      targetStoryIndex > 1 && userStoriesList[targetStoryIndex - 1]
        ? userStoriesList[targetStoryIndex - 1]
        : {},
  });

  userStoryDispatch({
    type: ReducerActionType.USER_STORY,
    payload: {},
  });
};

export const computeTouchDragDirection = ({ touchStartX, touchEndX }: any) => {
  if (touchStartX - touchEndX > 50) {
    return 'left'
  } else if (touchStartX - touchEndX < 50) {
    return 'right'
  }
};

export const detectAppMobileUserAgent = () => {
  return /Mobi|Android|iPhone/i.test(navigator.userAgent);
}

