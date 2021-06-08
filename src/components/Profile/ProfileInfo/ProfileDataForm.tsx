import style from "./ProfileInfo.module.css";
// import { ProfileType } from "../../../types/types"
import { InjectedFormProps, reduxForm } from "redux-form";
import { createField, GetStringKeys, Input, Textarea } from "../../common/FormsControls/FormsControls";
import { ProfileType } from "../../../types/types";

type PropsType = {
  profile: ProfileType,
}

type ProfileTypeKeys = GetStringKeys<ProfileType>;

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({ handleSubmit, profile, error }: any) => {
  debugger
  return (
    <form onSubmit={handleSubmit} >
      <div>
        <button>Save</button>
      </div>
      {error && <div className={style.formSummaryError}>{error}</div>}
      <div>
        <b>ID:</b> {profile.userId}
      </div>
      <div>
        <b>Name:</b> {createField<ProfileTypeKeys>("Name", "fullName", [], Input)}
      </div>
      <div>
        <b>Contacts: </b>
        {Object.keys(profile.contacts).map((key) => {
          return <div className={style.contact} key={key}>
            <b>{key}: {createField(key, "contacts" + key, [], Input)}</b>
          </div>
        })}
      </div>
      <div>
        <b>About me:</b> {createField<ProfileTypeKeys>("About me", "aboutMe", [], Textarea)}
      </div>
      <div>
        <b>Looking for a job:</b>{" "}
        {createField<ProfileTypeKeys>("", "lookingForAJob", [], Input, { type: "checkbox" })}
      </div>

      <div>
        <b>My skills:</b> {profile.lookingForAJobDescription}
        {createField<ProfileTypeKeys>("My skills", "lookingForAJobDescription", [], Textarea)}
      </div>
    </form>
  );
};

const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsType>({ form: "edit-profile" })(ProfileDataForm);

export default ProfileDataFormReduxForm;
