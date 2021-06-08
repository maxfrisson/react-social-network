import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import { ProfileType } from "../../types/types";

type PropsType = {
  profile: ProfileType | null,
  status: string, 
  updateStatus: (status: string) => void,
  isOwner: boolean, 
  saveAvatar: (file: File) => void, 
  saveProfile: (profile: ProfileType) => Promise<any>
}

const Profile: React.FC<PropsType> = (props) => {
  return (
    <div>
      <ProfileInfo
        saveAvatar={props.saveAvatar}
        isOwner={props.isOwner}
        saveProfile={props.saveProfile}
        profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}
      />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
