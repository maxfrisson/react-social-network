import { InjectedFormProps, reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../../../utils/validators/validators";
import { createField, GetStringKeys, Textarea } from "../../../common/FormsControls/FormsControls";

const maxLength10 = maxLengthCreator(10);

type PropsType = {};

export type AddPostFormValuesType = {
  newPostText: string;
};

type AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>;

let AddPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (
  props: any
) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        {createField<AddPostFormValuesTypeKeys>(
          "enter your post",
          "newPostText",
          [required, maxLength10],
          Textarea
        )}
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  );
};

export default reduxForm<AddPostFormValuesType, PropsType>({ form: "ProfileAddPostForm" })(
  AddPostForm
);
