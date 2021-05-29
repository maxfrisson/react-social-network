import { useState } from "react";
import Preloader from "../../common/Preloader/Preloader";
import ProfileDataForm from "./ProfileDataForm";
import style from "./ProfileInfo.module.css";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = ({ profile, status, updateStatus, isOwner, saveAvatar, saveProfile }) => {
  const [editMode, setEditMode] = useState(false);

  if (!profile) {
    return <Preloader />;
  }

  let defaultAvatar = "https://i.pravatar.cc/300";

  const onNewAvatarSelected = (e) => {
    if (e.target.files.length) {
      saveAvatar(e.target.files[[0]]);
    }
  };

  const onSubmit = (formData) => {
    saveProfile(formData).then(() => {
      setEditMode(false);
    });
  };

  return (
    <div className={style.description}>
      <div>
        <img
          className={style.userPhoto}
          src={profile.photos.large ? profile.photos.large : (profile.photos.large = defaultAvatar)}
          alt=""
        />
        <div className={style.addAvatar}>
          {isOwner && <input type={"file"} onChange={onNewAvatarSelected} />}
        </div>
      </div>
      <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      {editMode ? (
        <ProfileDataForm initialValues={profile} onSubmit={onSubmit} profile={profile} />
      ) : (
        <ProfileData
          profile={profile}
          isOwner={isOwner}
          activateEditMode={() => {
            setEditMode(true);
          }}
        />
      )}
    </div>
  );
};

const ProfileData = ({ profile, isOwner, activateEditMode }) => {
  return (
    <div>
      {isOwner && (
        <div>
          <button onClick={activateEditMode}>Edit</button>
        </div>
      )}
      <div>
        <b>ID:</b> {profile.userId}
      </div>
      <div>
        <b>Name:</b> {profile.fullName}
      </div>
      <div>
        <b>Contacts: </b>
        {Object.keys(profile.contacts).map((key) => {
          return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />;
        })}
      </div>
      <div>
        <b>About me:</b> {profile.aboutMe}
      </div>
      <div>
        <b>Looking for a job:</b> {profile.lookingForAJob ? "yes" : "no"}
      </div>
      {profile.lookingForAJob && (
        <div>
          <b>My skills:</b> {profile.lookingForAJobDescription}
        </div>
      )}
    </div>
  );
};

const Contact = ({ contactTitle, contactValue }) => {
  return (
    <div className={style.contact}>
      <b>{contactTitle}</b>: {contactValue}
    </div>
  );
};

export default ProfileInfo;
