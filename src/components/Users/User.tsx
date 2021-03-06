import { NavLink } from "react-router-dom";
import { UserType } from "../../types/types";
import styles from "./Users.module.css";

type PropsType = {
  user: UserType,
  followingInProgress: Array<number>,
  unfollow: (userId: number) => void,
  follow: (userId: number) => void
}

let User: React.FC<PropsType> = ({user, followingInProgress, follow, unfollow}) => {
  let defaultAvatar = "https://i.pravatar.cc/100?img=";
  return (
    <div className={styles.usersItem}>
      <span>
        <div>
          <NavLink to={"profile/" + user.id}>
            <img
              src={
                !user.photos.small
                  ? (user.photos.small = `${defaultAvatar}${Math.floor(Math.random() * 50)}`)
                  : user.photos.small
              }
              className={styles.userPhoto}
              alt=""
            />
          </NavLink>
        </div>
        <div>
          {user.followed ? (
            <button
              disabled={followingInProgress.some((id) => id === user.id)}
              onClick={() => {
                unfollow(user.id);
              }}
            >
              Unfollow
            </button>
          ) : (
            <button
              disabled={followingInProgress.some((id) => id === user.id)}
              onClick={() => {
                follow(user.id);
              }}
            >
              Follow
            </button>
          )}
        </div>
      </span>
      <span>
        <span>
          <div>{user.name}</div>
          <div>{user.status}</div>
        </span>
        <span>
          <div>{"user.location.country"}</div>
          <div>{"user.location.city"}</div>
        </span>
      </span>
    </div>
  );
};
export default User;
