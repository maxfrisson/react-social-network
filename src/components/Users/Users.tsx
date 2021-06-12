import styles from "./Users.module.css";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import UsersSearchForm from "./UsersSearchForm";
import { FilterType, requestUsers, follow, unfollow } from "../../redux/usersReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentPage,
  getFollowingInProgress,
  getPageSize,
  getTotalUsersCount,
  getUsers,
  getUsersFilter,
} from "../../redux/usersSelectors";
import { useEffect } from "react";
import { useHistory } from "react-router";
import * as queryString from "querystring";

type PropsType = {};

type QueryParamsType = {term?: string, page?: string, friend?: string };

export const Users: React.FC<PropsType> = (props) => {
  const users = useSelector(getUsers);
  const totalUsersCount = useSelector(getTotalUsersCount);
  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);
  const filter = useSelector(getUsersFilter);
  const followingInProgress = useSelector(getFollowingInProgress);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType;

    let actualPage = currentPage;
    let actualFilter = filter;
    if (!!parsed.page) actualPage = Number(parsed.page);
    if (!!parsed.term) actualFilter = { ...actualFilter, term: parsed.term as string };
    switch (parsed.friend) {
      case "null":
        actualFilter = { ...actualFilter, friend: null };
        break;
      case "true":
        actualFilter = { ...actualFilter, friend: true };
        break;
      case "false":
        actualFilter = { ...actualFilter, friend: false };
        break;
    }

    dispatch(requestUsers(actualPage, pageSize, actualFilter));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const query: QueryParamsType = {};
    if (!!filter.term) query.term = filter.term;
    if (filter.friend !== null) query.friend = String(filter.friend);
    if (currentPage !== 1) query.page = String(currentPage);

    history.push({
      pathname: "/users",
      search: queryString.stringify(query),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPageChanged = (pageNumber: number) => {
    dispatch(requestUsers(pageNumber, pageSize, filter));
  };
  const onFilterChanged = (filter: FilterType) => {
    dispatch(requestUsers(1, pageSize, filter));
  };

  const followUser = (userId: number) => {
    dispatch(follow(userId));
  };
  const unfollowUser = (userId: number) => {
    dispatch(unfollow(userId));
  };

  return (
    <div className={styles.usersContent}>
      <UsersSearchForm onFilterChanged={onFilterChanged} />

      <Paginator
        currentPage={currentPage}
        totalItemsCount={totalUsersCount}
        onPageChanged={onPageChanged}
        pageSize={pageSize}
      />

      <div className={styles.usersList}>
        {users.map((u) => (
          <User
            user={u}
            key={u.id}
            followingInProgress={followingInProgress}
            unfollow={unfollowUser}
            follow={followUser}
          />
        ))}
      </div>
    </div>
  );
};
