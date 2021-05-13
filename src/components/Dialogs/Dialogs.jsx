import React from "react";
import { Redirect } from "react-router";
import { Field, reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../utils/validators/validators";
import { Textarea } from "../common/FormsControls/FormsControls";
import style from "./Dialogs.module.css";
import DialogItem from "./DialogsItem/DialogItem";
import Message from "./Message/Message";

const Dialogs = (props) => {
  let dialogsElements = props.dialogsPage.dialogs.map((dialog) => (
    <DialogItem name={dialog.name} key={dialog.id} id={dialog.id} />
  ));

  let messagesElements = props.dialogsPage.messages.map((message) => (
    <Message message={message.message} key={message.id} />
  ));

  let addNewMessage = (value) => {
    props.addMessage(value.newMessageBody);
  }

  if (!props.isAuth) return <Redirect to="/login" />;

  return (
    <div className={style.dialogs}>
      <h2>DIALOGS</h2>
      <div className={style.dialogsContent}>
        <div className={style.dialogsItems}>{dialogsElements}</div>
        <div className={style.messages}>
          {messagesElements}
          <AddMessageFormRedux
            onSubmit={addNewMessage}
          />
        </div>
      </div>
    </div>
  );
};

const maxLength30 = maxLengthCreator(30);

const AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field 
        name={"newMessageBody"} 
        placeholder="Enter your message here..." 
        component={Textarea} 
        validate={[required, maxLength30]}
        />
      </div>
      <div>
        <button>Send</button>
      </div>
    </form>
  );
};

const AddMessageFormRedux = reduxForm({ form: "dialogsAddMessageForm" })(AddMessageForm);

export default Dialogs;
