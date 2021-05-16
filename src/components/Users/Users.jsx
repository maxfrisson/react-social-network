import styles from "./users.module.css";
import { NavLink } from "react-router-dom";

let Users = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize) - 990;
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  
  let defaultAvatar = "https://i.pravatar.cc/100?img=";
  
  return (

    <div className={styles.usersContent}>
      <div className={styles.usersPageList}>
        {pages.map((p) => {
          return (
            <span
              className={props.currentPage === p ? styles.selectedPage : styles.page}
              onClick={(e) => {
                props.onPageChanged(p);
              }}
            >
              {p}
            </span>
          );
        })}
      </div>
      <div className={styles.usersList}>
        {props.users.map((u) => (
          <div className={styles.usersItem} key={u.id}>
            <span>
              <div>
                <NavLink to={"profile/" + u.id}>
                  <img
                    src={
                      !u.photos.small
                        ? (u.photos.small = `${defaultAvatar}${Math.floor(Math.random() * 50)}`)
                        : u.photos.small
                    }
                    className={styles.userPhoto}
                    alt=""
                  />
                </NavLink>
              </div>
              <div>
                {u.followed ? (
                  <button
                    disabled={props.followingInProgress.some((id) => id === u.id)}
                    onClick={() => {
                      props.unfollow(u.id);
                    }}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    disabled={props.followingInProgress.some((id) => id === u.id)}
                    onClick={() => {
                      props.follow(u.id);
                    }}
                  >
                    Follow
                  </button>
                )}
              </div>
            </span>
            <span>
              <span>
                <div>{u.name}</div>
                <div>{u.status}</div>
              </span>
              <span>
                <div>{"u.location.country"}</div>
                <div>{"u.location.city"}</div>
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
