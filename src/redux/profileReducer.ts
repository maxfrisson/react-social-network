import { stopSubmit } from "redux-form";
import { profileAPI } from "../api/profileAPI";
import { PhotosType, PostType, ProfileType } from "../types/types";

const ADD_POST = "ADD_POST";
const DELETE_POST = "DELETE_POST";

const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";

const SAVE_AVATAR_SUCCESS = "SAVE_AVATAR_SUCCESS";


let initialState = {
  posts: [
    { id: 1, message: "Hi. It's my first post!", likesCount: 13 },
    { id: 2, message: "How are you, man?", likesCount: 42 },
    { id: 3, message: "Yo Yo YO", likesCount: 17 },
    { id: 4, message: "What's your name?", likesCount: 76 },
    { id: 5, message: "Where do you live", likesCount: 64 },
    { id: 6, message: "Good bye!", likesCount: 53 },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: "",
  newPostText: ""
};

export type initialStateType = typeof initialState;

const profileReducer = (state = initialState, action: any):initialStateType => {
  switch (action.type) {
    case ADD_POST:
      let post = action.newPostText;
      let idPostGenerate = state.posts.length + 1;
      return {
        ...state,
        newPostText: "",
        posts: [
          ...state.posts,
          {
            id: idPostGenerate,
            message: post,
            likesCount: 0,
          },
        ],
      };

    case DELETE_POST:
      return { ...state, posts: state.posts.filter((p) => p.id !== action.postId) };

    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile,
        status: "",
      };

    case SET_STATUS:
      return {
        ...state,
        status: action.status,
      };

    case SAVE_AVATAR_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      };

    default:
      return state;
  }
};

type AddPostActionCreatorActionType = {
  type: typeof ADD_POST,
  newPostText: string
};
export const addPostActionCreator = (newPostText: string): AddPostActionCreatorActionType => ({ type: ADD_POST, newPostText });

type SetUserProfileActionType = {
  type: typeof SET_USER_PROFILE,
  profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({ type: SET_USER_PROFILE, profile });

type SetStatusActionType = {
  type: typeof SET_STATUS,
  status: string
}
export const setStatus = (status:string):SetStatusActionType => ({ type: SET_STATUS, status });

type DeletePostActionType = {
  type: typeof DELETE_POST,
  postId: number
}
export const deletePost = (postId: number):DeletePostActionType => ({ type: DELETE_POST, postId });

type SaveAvatarSuccessActionType = {
  type: typeof SAVE_AVATAR_SUCCESS,
  photos: PhotosType
}
export const saveAvatarSuccess = (photos: PhotosType):SaveAvatarSuccessActionType => ({ type: SAVE_AVATAR_SUCCESS, photos });


export const getUserProfile = (userId: number) => async (dispatch: any) => {
  let data = await profileAPI.userProfile(userId);
  dispatch(setUserProfile(data));
};

export const getStatus = (userId: number) => async (dispatch: any) => {
  let data = await profileAPI.getStatus(userId);
  dispatch(setStatus(data));
};

export const updateStatus = (status: string) => async (dispatch: any) => {
  let data = await profileAPI.updateStatus(status);
  if (data.resultCode === 0) {
    dispatch(setStatus(status));
  }
};

export const saveAvatar = (file: any) => async (dispatch: any) => {
  let data = await profileAPI.saveAvatar(file);
  if (data.resultCode === 0) {
    dispatch(saveAvatarSuccess(data.data.photos));
  }
};

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
  const userId = getState().auth.id;
  let data = await profileAPI.saveProfile(profile);
  if (data.resultCode === 0) {
    dispatch(getUserProfile(userId));
  } else {
    dispatch(stopSubmit("edit-profile", { _error: data.messages[0] }));
    return Promise.reject(data.messages[0])
  }
};

export default profileReducer;
