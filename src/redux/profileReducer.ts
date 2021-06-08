import { FormAction, stopSubmit } from "redux-form";
import { profileAPI } from "../api/profileAPI";
import { PhotosType, PostType, ProfileType } from "../types/types";
import { BasicThunkType, InferActionsTypes } from "./redux-store";

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

const profileReducer = (state = initialState, action: any):initialStateType => {
  switch (action.type) {
    case "RSN/PROFILE/ADD_POST":
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

    case "RSN/PROFILE/DELETE_POST":
      return { ...state, posts: state.posts.filter((p) => p.id !== action.postId) };

    case "RSN/PROFILE/SET_USER_PROFILE":
      return {
        ...state,
        profile: action.profile,
        status: "",
      };

    case "RSN/PROFILE/SET_STATUS":
      return {
        ...state,
        status: action.status,
      };

    case "RSN/PROFILE/SAVE_AVATAR_SUCCESS":
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      };

    default:
      return state;
  }
};

export const actions = {
  addPostActionCreator: (newPostText: string) => ({ type: "RSN/PROFILE/ADD_POST", newPostText } as const),
  deletePost: (postId: number) => ({ type: "RSN/PROFILE/DELETE_POST", postId } as const),
  setUserProfile: (profile: ProfileType) => ({ type: "RSN/PROFILE/SET_USER_PROFILE", profile } as const),
  setStatus: (status:string) => ({ type: "RSN/PROFILE/SET_STATUS", status } as const),
  saveAvatarSuccess: (photos: PhotosType) => ({ type: "RSN/PROFILE/SAVE_AVATAR_SUCCESS", photos } as const),
}

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
  let data = await profileAPI.userProfile(userId);
  dispatch(actions.setUserProfile(data));
};

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
  let data = await profileAPI.getStatus(userId);
  dispatch(actions.setStatus(data));
};

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
  let data = await profileAPI.updateStatus(status);
  if (data.resultCode === 0) {
    dispatch(actions.setStatus(status));
  }
};

export const saveAvatar = (file: File): ThunkType => async (dispatch) => {
  let data = await profileAPI.saveAvatar(file);
  if (data.resultCode === 0) {
    dispatch(actions.saveAvatarSuccess(data.data.photos));
  }
};

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
  const userId = getState().auth.id;
  let data = await profileAPI.saveProfile(profile);
  if (data.resultCode === 0) {
    if (userId != null) {
      dispatch(getUserProfile(userId));
    }else {
      throw new Error("userId can't be null")
    }
  } else {
    dispatch(stopSubmit("edit-profile", { _error: data.messages[0] }));
    return Promise.reject(data.messages[0])
  }
};

export default profileReducer;

export type initialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BasicThunkType<ActionsType| FormAction>