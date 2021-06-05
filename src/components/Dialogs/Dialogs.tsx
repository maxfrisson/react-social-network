import style from './Dialogs.module.css'
import { Redirect } from "react-router";
import { Field, reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../utils/validators/validators";
import { Textarea } from "../common/FormsControls/FormsControls";
import DialogsItem from "./DialogsItem/DialogsItem";
import Message from "./Message/Message";
import { DialogType, MessageType } from '../../types/types';

type PropsType = {
  dialogs: Array<DialogType>,
  messages: Array<MessageType>,
  isAuth: boolean,

  addMessage: (value: any) => void
}

const Dialogs: React.FC<PropsType> = ({dialogs, messages, addMessage, isAuth}) => {
  let dialogsElements = dialogs.map((dialog: any) => (
    <DialogsItem name={dialog.name} key={dialog.id} id={dialog.id} />
  ));

  let messagesElements = messages.map((message: any) => (
    <Message message={message.message} key={message.id} />
  ));

  let addNewMessage = (value: any) => {
    addMessage(value.newMessageBody);
  }

  if (!isAuth) return <Redirect to="/login" />;

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

const AddMessageForm = (props: any) => {
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