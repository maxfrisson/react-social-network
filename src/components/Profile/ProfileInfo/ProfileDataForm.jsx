import style from "./ProfileInfo.module.css";

import { reduxForm } from "redux-form";
import { createField, Input, Textarea } from "../../common/FormsControls/FormsControls";

const ProfileDataForm = ({ handleSubmit,profile, error }) => {
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
        <b>Name:</b> {createField("Name", "fullName", [], Input)}
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
        <b>About me:</b> {createField("About me", "aboutMe", [], Textarea)}
      </div>
      <div>
        <b>Looking for a job:</b>{" "}
        {createField("", "lookingForAJob", [], Input, { type: "checkbox" })}
      </div>

      <div>
        <b>My skills:</b> {profile.lookingForAJobDescription}
        {createField("My skills", "lookingForAJobDescription", [], Textarea)}
      </div>
    </form>
  );
};

const ProfileDataFormReduxForm = reduxForm({ form: "edit-profile" })(ProfileDataForm);

export default ProfileDataFormReduxForm;
