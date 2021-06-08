import style from './Dialogs.module.css'
import { Redirect } from "react-router";
import DialogsItem from "./DialogsItem/DialogsItem";
import Message from "./Message/Message";
import { InitialStateType } from '../../redux/dialogsReducer';
import AddMessageForm from './Message/AddMessageForm/AddMessageForm';

type OwnPropsType = {
  dialogsPage: InitialStateType,
  addMessage: (messageText: string) => void,
  isAuth: boolean,
}

export type NewMessageFormValuesType = {
  newMessageBody: string,
}

const Dialogs: React.FC<OwnPropsType> = (props) => {
  let state = props.dialogsPage;
  let dialogsElements = state.dialogs.map((dialog: any) => (
    <DialogsItem name={dialog.name} key={dialog.id} id={dialog.id} />
  ));
  let messagesElements = state.messages.map((message: any) => (
    <Message message={message.message} key={message.id} />
  ));

  let addNewMessage = (value: NewMessageFormValuesType) => {
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
          <AddMessageForm
            onSubmit={addNewMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
