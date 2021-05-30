import styles from "./Users.module.css";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import { UserType } from "../../types/types";

type PropsType = {
  currentPage: number, 
  totalUsersCount: number,
  pageSize: number, 
  onPageChanged: (pageNumber: number) => void,
  users: Array<UserType>
  followingInProgress: Array<number>,
  unfollow: () => void,
  follow: () => void
}

let Users: React.FC<PropsType> = ({ currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props }) => {

  return (
    <div className={styles.usersContent}>
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
