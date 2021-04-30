import style from "./ProfileInfo.module.css";

const ProfileInfo = () => {
  return (
    <div>
      <div>
        <img
          className={style.image}
          src="https://cdn.sandals.com/beaches/v12/images/general/destinations/home/beach.jpg"
          alt=""
        />
      </div>
      <div className={style.description}>ava + description</div>
    </div>
  );
};

export default ProfileInfo;
