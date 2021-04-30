import styles from "./users.module.css";

let Users = (props) => {
  if (props.users.length === 0) {
    props.setUsers (
      [
        {
          id: 1,
          photoUrl: "https://htmlstream.com/preview/unify-v2.6.3/assets/img-temp/400x450/img5.jpg",
          fullName: "Max",
          status: "Hello World!!!",
          location: { city: "Kiev", country: "Ukraine" },
          followed: true,
        },
        {
          id: 2,
          photoUrl: "https://i1.rgstatic.net/ii/profile.image/820485688414213-1572630440525_Q512/Melissa-Cox-2.jpg",
          fullName: "Vika",
          status: "Hi World!!!",
          location: { city: "Brest", country: "Belarus" },
          followed: true,
        },
        {
          id: 3,
          photoUrl: "https://newdoorfiji.com/wp-content/uploads/2018/03/profile-img-1.jpg",
          fullName: "Lera",
          status: "Bye World!!!",
          location: { city: "Tula", country: "Russia" },
          followed: false,
        },
        {
          id: 4,
          photoUrl: "https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg",
          fullName: "Michael",
          status: "How are you World???",
          location: { city: "Kirov", country: "Russia" },
          followed: false,
        },
      ]
    )
  }

  return (
    <div>
      {props.users.map((u) => (
        <div key={u.id}>
          <span>
            <div>
              <img src={u.photoUrl} className={styles.userPhoto} alt="" />
            </div>
            <div>
              {u.followed ? (
                <button
                  onClick={() => {
                    props.unfollow(u.id);
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
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
              <div>{u.fullName}</div>
              <div>{u.status}</div>
            </span>
            <span>
              <div>{u.location.country}</div>
              <div>{u.location.city}</div>
            </span>
          </span>
        </div>
      ))}
    </div>
  );
};

export default Users;
