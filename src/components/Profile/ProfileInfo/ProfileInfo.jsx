import Preloader from "../../common/Preloader/Preloader";
import style from "./ProfileInfo.module.css";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = ({ profile, status, updateStatus }) => {
  if (!profile) {
    return <Preloader />;
  }

  let defaultAvatar = "https://i.pravatar.cc/300";
  return (
    <div className={style.description}>
      <img
        className={style.userPhoto}
        src={profile.photos.large ? profile.photos.large : (profile.photos.large = defaultAvatar)}
        alt=""
      />
      <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      <div>ID: {profile.userId}</div>
      <div>Имя: {profile.fullName}</div>
      <div>Контакты: {profile.contacts.instagram}</div>
      <div>О себе: {profile.aboutMe}</div>
      <div>Мои навыки: {profile.lookingForAJobDescription}</div>
    </div>
  );
};

export default ProfileInfo;
