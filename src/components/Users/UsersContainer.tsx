import React from "react";
import { connect } from "react-redux";
import {
  follow,
  requestUsers,
  setCurrentPage,
  toggleFollowingProgress,
  unfollow,
} from "../../redux/usersReducer";
import {
  getUsers,
  getPageSize,
  getTotalUsersCount,
  getCurrentPage,
  getIsFetching,
  getFollowingInProgress,
} from "../../redux/usersSelectors";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { compose } from "redux";
import { UserType } from "../../types/types";
import { AppStateType } from "../../redux/redux-store";

type PropsType = {
  currentPage: number,
  pageSize: number,
  isFetching: boolean,
  totalUsersCount: number,
  users: Array<UserType>,
  followingInProgress: Array<number>,

  getUsers: (currentPage: number, pageSize: number) => void,
  unfollow: () => void,
  follow: () => void
}

class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    const {currentPage, pageSize} = this.props;
    this.props.getUsers(currentPage, pageSize);
  }

  onPageChanged = (pageNumber: number) => {
    const {pageSize} = this.props;
    this.props.getUsers(pageNumber, pageSize);
  };
  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}
          users={this.props.users}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          followingInProgress={this.props.followingInProgress}
        />
      </>
    );
  }
}

let mapStateToProps = (state: AppStateType) => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
};


export default compose(
  connect(mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage,
    toggleFollowingProgress,
    getUsers: requestUsers,
  })
)(UsersContainer);
