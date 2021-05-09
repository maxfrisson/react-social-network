import React from "react";
import { Redirect } from "react-router";
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

  let newMessageElem = React.createRef();

  let addMessage = () => {
    props.addMessage();
  };

  let onMessageChange = () => {
    let text = newMessageElem.current.value;
    props.updateNewMessageText(text);
  };

  if (!props.isAuth) return <Redirect to="/login" />;

  return (
    <div className={style.dialogs}>
      <h2>DIALOGS</h2>
      <div className={style.dialogsContent}>
        <div className={style.dialogsItems}>{dialogsElements}</div>
        <div className={style.messages}>
          {messagesElements}
          <div>
            <textarea
              value={props.dialogsPage.newMessageText}
              onChange={onMessageChange}
              ref={newMessageElem}
              placeholder="Enter your message here..."
            />
          </div>
          <div>
            <button onClick={addMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
