import React, { useState } from "react";
// import style from "./ProfileInfo.module.css";

const ProfileStatusWithHooks = (props) => {
  let [editMode, setEditMode] = useState(false);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    // props.updateStatus(this.state.status);
  };

  return (
    <div>
      {!editMode && (
        <div>
          <span onClick={activateEditMode}>{props.status || "------"}</span>
        </div>
      )}
      {editMode && (
        <div>
          <input autoFocus={true} onBlur={deactivateEditMode} />
        </div>
      )}
    </div>
  );
};

export default ProfileStatusWithHooks;
