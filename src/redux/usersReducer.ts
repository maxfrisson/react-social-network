import { Dispatch } from "redux";
import { usersAPI } from "../api/usersAPI";
import { UserType } from "../types/types";
import { updateObjectInArray } from "../utils/validators/objectHelpers";
import { BasicThunkType, InferActionsTypes } from "./redux-store";

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 12,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>, //array of users ids
};


const usersReducer = (state = initialState, action: ActionsTypes):initialStateType => {
  switch (action.type) {
    case "FOLLOW":
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", { followed: true }),
      };
    case "UNFOLLOW":
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", { followed: false }),
      };

    case "SET_USERS": {
      return { ...state, users: action.users };
    }

    case "SET_CURRENT_PAGE": {
      return { ...state, currentPage: action.currentPage };
    }
    case "SET_TOTAL_USERS_COUNT": {
      return { ...state, totalUsersCount: action.totalUsersCount };
    }

    case "TOGGLE_IS_FETCHING": {
      return { ...state, isFetching: action.isFetching };
    }

    case "TOGGLE_IS_FOLLOWING_PROGRESS": {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      };
    }

    default:
      return state;
  }
};

export const actions = {
  followSuccess: (userId: number) => ({ type: "FOLLOW", userId } as const),
  unfollowSuccess: (userId: number) => ({ type: "UNFOLLOW", userId } as const),
  setUsers: (users: Array<UserType>) => ({ type: "SET_USERS", users }  as const),
  setCurrentPage: (currentPage: number) => ({
    type: "SET_CURRENT_PAGE",
    currentPage: currentPage,
  } as const),
  setTotalUsersCount: (totalUsersCount: number) => ({
    type: "SET_TOTAL_USERS_COUNT",
    totalUsersCount: totalUsersCount,
  } as const),
  toggleIsFetching: (isFetching: boolean) => ({ type: "TOGGLE_IS_FETCHING", isFetching } as const),
  toggleFollowingProgress: (isFetching: any, userId: number) => ({
    type: "TOGGLE_IS_FOLLOWING_PROGRESS",
    isFetching,
    userId,
  } as const),
}

export const requestUsers = (page: number, pageSize: number): ThunkType => async (dispatch, getState) => {
  dispatch(actions.toggleIsFetching(true));
  dispatch(actions.setCurrentPage(page));
  let data = await usersAPI.getUsers(page, pageSize);
  dispatch(actions.toggleIsFetching(false));
  dispatch(actions.setUsers(data.items));
  dispatch(actions.setTotalUsersCount(data.totalCount));
};

const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any, actionCreator: (userId: number)=> ActionsTypes) => {
  dispatch(actions.toggleFollowingProgress(true, userId));
  let response = await apiMethod(userId);
  if (response.data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(actions.toggleFollowingProgress(false, userId));
};

export const follow = (userId: number): ThunkType => async (dispatch) => {
  _followUnfollowFlow(dispatch, userId, usersAPI.userFollow.bind(usersAPI), actions.followSuccess);
};

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
  _followUnfollowFlow(dispatch, userId, usersAPI.userUnfollow.bind(usersAPI), actions.unfollowSuccess);
};

export default usersReducer;

export type initialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type DispatchType = Dispatch<ActionsTypes>;
type ThunkType = BasicThunkType<ActionsTypes>;