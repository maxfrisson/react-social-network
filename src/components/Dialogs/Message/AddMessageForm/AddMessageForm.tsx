import { InjectedFormProps, reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../../../utils/validators/validators";
import { createField, Textarea } from "../../../common/FormsControls/FormsControls";
import { NewMessageFormValuesType } from "../../Dialogs";

const maxLength30 = maxLengthCreator(30);

type NewMessageFormValuesKeysType = Extract<keyof NewMessageFormValuesType, string>;

type PropsType = {};

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType> =
  (props) => {
    return (
      <form onSubmit={props.handleSubmit}>
        <div>
          {createField<NewMessageFormValuesKeysType>(
            "Enter your message here...",
            "newMessageBody",
            [required, maxLength30],
            Textarea
          )}
        </div>
        <div>
          <button>Send</button>
        </div>
      </form>
    );
  };

export default reduxForm<NewMessageFormValuesType>({ form: "dialogsAddMessageForm" })(
  AddMessageForm
);
