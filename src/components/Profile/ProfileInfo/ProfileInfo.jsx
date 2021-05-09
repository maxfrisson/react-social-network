import Preloader from "../../Preloader/Preloader";
import style from "./ProfileInfo.module.css";
import ProfileStatus from './ProfileStatus';

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />;
  }

  let defaultAvatar = "https://i.pravatar.cc/300";
  return (
    <div className={style.description}>
      <img
        className={style.userPhoto}
        src={
          props.profile.photos.large
            ? props.profile.photos.large
            : (props.profile.photos.large = defaultAvatar)
        }
        alt=""
      />
      <ProfileStatus status={"HELLO WORLD!!!"} />
      <div>ID: {props.profile.userId}</div>
      <div>Имя: {props.profile.fullName}</div>
      <div>Контакты: {props.profile.contacts.instagram}</div>
      <div>О себе: {props.profile.aboutMe}</div>
      <div>Мои навыки: {props.profile.lookingForAJobDescription}</div>
    </div>
  );
};

export default ProfileInfo;
