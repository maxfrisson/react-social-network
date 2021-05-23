import styles from "./Users.module.css";
import { NavLink } from "react-router-dom";

let User = ({user, followingInProgress, follow, unfollow}) => {
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
