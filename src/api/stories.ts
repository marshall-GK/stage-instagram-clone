import ApiProvider from "./ApiHandler";

type ApiResponse = {
  isSuccess: boolean;
  errorMessage?: string;
  data?: any;
  status: number;
};

const baseUrl = "https://stage-instagram-clone-api.onrender.com";
// const baseUrl = "http://localhost:5000";


export const getStories = async (): Promise<ApiResponse> => {
 return ApiProvider.get(`${baseUrl}/userStoryList`);
};

export const getUserStory = async (id: number): Promise<ApiResponse> => {
  return ApiProvider.get(`${baseUrl}/userStory?id=${id}`);
};
