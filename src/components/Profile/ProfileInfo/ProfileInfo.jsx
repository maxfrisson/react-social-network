import Preloader from "../../Preloader/Preloader";
import style from "./ProfileInfo.module.css";

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />;
  }

  let defaultAvatar = "https://i.pravatar.cc/300";

  return (
    <div>
      <div>
        <img
          className={style.image}
          src="https://cdn.sandals.com/beaches/v12/images/general/destinations/home/beach.jpg"
          alt=""
        />
      </div>
      <div className={style.description}>
        <img
          src={!props.profile.photos.large ? defaultAvatar : props.profile.photos.large}
          alt=""
        />
        <div>{props.profile.userId}</div>
        <div>{props.profile.fullName}</div>
        <div>{props.profile.aboutMe}</div>
        <div>{props.profile.contacts.instagram}</div>
        <div>{props.profile.lookingForAJobDescription}</div>
      </div>
    </div>
  );
};

export default ProfileInfo;
