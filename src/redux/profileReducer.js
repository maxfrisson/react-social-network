import { profileAPI } from "../api/api";

const ADD_POST = "ADD_POST";
const DELETE_POST = "DELETE_POST";

const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";

let initialState = {
  posts: [
    { id: 1, message: "Hi. It's my first post!", likesCount: 13 },
    { id: 2, message: "How are you, man?", likesCount: 42 },
    { id: 3, message: "Yo Yo YO", likesCount: 17 },
    { id: 4, message: "What's your name?", likesCount: 76 },
    { id: 5, message: "Where do you live", likesCount: 64 },
    { id: 6, message: "Good bye!", likesCount: 53 },
  ],
  profile: null,
};

const profileReducer = (state = initialState, action) => {
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

    default:
      return state;
  }
};

export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText });

export const deletePost = (postId) => ({ type: DELETE_POST, postId });

export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });

export const setStatus = (status) => ({ type: SET_STATUS, status });

export const getUserProfile = (userId) => async (dispatch) => {
  let response = await profileAPI.userProfile(userId);
  dispatch(setUserProfile(response.data));
};

export const getStatus = (userId) => async (dispatch) => {
  let response = await profileAPI.getStatus(userId);
  dispatch(setStatus(response.data));
};

export const updateStatus = (status) => async (dispatch) => {
  let response = await profileAPI.updateStatus(status);
  if (response.data.resultCode === 0) {
    dispatch(setStatus(status));
  }
};

export default profileReducer;
