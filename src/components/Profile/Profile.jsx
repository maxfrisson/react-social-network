import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {
  return (
    <div>
      <ProfileInfo saveAvatar={props.saveAvatar} isOwner={props.isOwner} profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
