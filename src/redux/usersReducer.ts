import { Dispatch } from "redux";
import { ResponseType } from "../api/api";
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
  filter: {
    term: "",
    friend: null as null | boolean
  }
};

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case "RSN/USERS/FOLLOW":
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", { followed: true }),
      };
    case "RSN/USERS/UNFOLLOW":
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", { followed: false }),
      };

    case "RSN/USERS/SET_USERS": {
      return { ...state, users: action.users };
    }

    case "RSN/USERS/SET_CURRENT_PAGE": {
      return { ...state, currentPage: action.currentPage };
    }
    case "RSN/USERS/SET_TOTAL_USERS_COUNT": {
      return { ...state, totalUsersCount: action.totalUsersCount };
    }

    case "RSN/USERS/TOGGLE_IS_FETCHING": {
      return { ...state, isFetching: action.isFetching };
    }

    case "RSN/USERS/SET_FILTER": {
      return {...state, filter: action.payload}
    }

    case "RSN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS": {
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
  followSuccess: (userId: number) => ({ type: "RSN/USERS/FOLLOW", userId } as const),
  unfollowSuccess: (userId: number) => ({ type: "RSN/USERS/UNFOLLOW", userId } as const),
  setUsers: (users: Array<UserType>) => ({ type: "RSN/USERS/SET_USERS", users } as const),
  setCurrentPage: (currentPage: number) =>
    ({
      type: "RSN/USERS/SET_CURRENT_PAGE",
      currentPage: currentPage,
    } as const),
  setFilter: (filter: FilterType) =>
    ({
      type: "RSN/USERS/SET_FILTER",
      payload: filter,
    } as const),
  setTotalUsersCount: (totalUsersCount: number) =>
    ({
      type: "RSN/USERS/SET_TOTAL_USERS_COUNT",
      totalUsersCount: totalUsersCount,
    } as const),
  toggleIsFetching: (isFetching: boolean) =>
    ({ type: "RSN/USERS/TOGGLE_IS_FETCHING", isFetching } as const),
  toggleFollowingProgress: (isFetching: any, userId: number) =>
    ({
      type: "RSN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS",
      isFetching,
      userId,
    } as const),
};

export const requestUsers =
  (page: number, pageSize: number, filter: FilterType): ThunkType =>
  async (dispatch, getState) => {
    dispatch(actions.toggleIsFetching(true));
    dispatch(actions.setCurrentPage(page));
    dispatch(actions.setFilter(filter));
    let data = await usersAPI.getUsers(page, pageSize, filter.term, filter.friend);
    dispatch(actions.toggleIsFetching(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount));
  };

const _followUnfollowFlow = async (
  dispatch: DispatchType,
  userId: number,
  apiMethod: (userId: number) => Promise<ResponseType>,
  actionCreator: (userId: number) => ActionsTypes
) => {
  dispatch(actions.toggleFollowingProgress(true, userId));
  let response = await apiMethod(userId);
  if (response.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(actions.toggleFollowingProgress(false, userId));
};

export const follow =
  (userId: number): ThunkType =>
  async (dispatch) => {
    await _followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.follow.bind(usersAPI),
      actions.followSuccess
    );
  };

export const unfollow =
  (userId: number): ThunkType =>
  async (dispatch) => {
    await _followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.unfollow.bind(usersAPI),
      actions.unfollowSuccess
    );
  };

export default usersReducer;

export type InitialStateType = typeof initialState;
export type FilterType = typeof initialState.filter;
type ActionsTypes = InferActionsTypes<typeof actions>;
type DispatchType = Dispatch<ActionsTypes>;
type ThunkType = BasicThunkType<ActionsTypes>;
