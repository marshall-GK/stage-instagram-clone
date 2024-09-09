import { ReducerActionType } from "./actions";

export const defaultStoriesReducerState = {
  userStory: [],
  userStoriesList: [],
  currentAvatarMetaData: {
    id: 0,
    name: '',
    image: '',
  },
  prevAvatarMetaData: {
    id: 0,
    name: '',
    image: '',
  },
  nextAvatarMetaData: {
    id: 0,
    name: '',
    image: '',
  },
  userAvatarMetaData: {
    id: 0,
    name: '',
    image: '',
  },
  enableStoryView: false,
  currentStoryIndex: 0,
  currentUserId: undefined,
} as {
  userStory: any[];
  userStoriesList: any[],
  currentAvatarMetaData: {
    id: number;
    name: string;
    image: string;
  },
  prevAvatarMetaData: {
    id: number;
    name: string;
    image: string;
  },
  nextAvatarMetaData: {
    id: number;
    name: string;
    image: string;
  },
  userAvatarMetaData: {
    id: number;
    name: string;
    image: string;
  },
  enableStoryView: boolean,
  currentStoryIndex: number,
  currentUserId: number | undefined,
};

export const StoriesReducer = (state: any, action: any) => {
  switch (action.type) {
    case ReducerActionType.USER_STORY: {
      return {
        ...state,
        userStory: action.payload,
      };
    }
    case ReducerActionType.CURRENT_AVATAR_META_DATA: {
      return {
        ...state,
        currentAvatarMetaData: action.payload,
      };
    }
    case ReducerActionType.NEXT_AVATAR_META_DATA: {
      return {
        ...state,
        nextAvatarMetaData: action.payload,
      };
    }
    case ReducerActionType.PREV_AVATAR_META_DATA: {
      return {
        ...state,
        prevAvatarMetaData: action.payload,
      };
    }
    case ReducerActionType.ENABLE_STORY_VIEW: {
      return {
        ...state,
        enableStoryView: action.payload,
      };
    }
    case ReducerActionType.CURRENT_STORY_INDEX: {
      return {
        ...state,
        currentStoryIndex: action.payload,
      };
    }
    case ReducerActionType.CURRENT_USER_ID: {
      return {
        ...state,
        currentUserId: action.payload,
      };
    }
    case ReducerActionType.RESET: {
      return {
        ...defaultStoriesReducerState,
      };
    }
    case ReducerActionType.USER_STORIES_LIST: {
      return {
        ...state,
        userStoriesList: action.payload
      }
    }
    default:
      console.error("No Action type found");
      return state;
  }
};
