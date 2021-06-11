import styles from "./Users.module.css";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import UsersSearchForm from "./UsersSearchForm";
import { UserType } from "../../types/types";
import { FilterType } from "../../redux/usersReducer";

type PropsType = {
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  onPageChanged: (pageNumber: number) => void;
  onFilterChanged: (filter: FilterType) => void;
  users: Array<UserType>;
  followingInProgress: Array<number>;
  unfollow: (userId: number) => void;
  follow: (userId: number) => void;
};

let Users: React.FC<PropsType> = ({
  currentPage,
  totalUsersCount,
  pageSize,
  onPageChanged,
  users,
  ...props
}) => {
  return (
    <div className={styles.usersContent}>
      <UsersSearchForm onFilterChanged={props.onFilterChanged} />

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
            followingInProgress={props.followingInProgress}
            unfollow={props.unfollow}
            follow={props.follow}
          />
        ))}
      </div>
    </div>
  );
};

export default Users;
