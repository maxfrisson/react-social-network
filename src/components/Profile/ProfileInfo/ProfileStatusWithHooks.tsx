import React, { useEffect, useState } from "react";
import style from "./ProfileInfo.module.css";

const ProfileStatusWithHooks = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  useEffect ( () => {
    setStatus(props.status)
  }, [props.status])

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  };

  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value);
  };

  return (
    <div className={style.status}>
      {!editMode && (
        <div>
         <b>Status:</b> <span onClick={activateEditMode}>{props.status || "------"}</span>
        </div>
      )}
      {editMode && (
        <div>
         <b>Status:</b> <input 
          autoFocus={true} 
          onBlur={deactivateEditMode} 
          onChange={onStatusChange} 
          value={status}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileStatusWithHooks;
