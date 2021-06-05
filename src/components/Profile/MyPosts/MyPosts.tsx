import React from "react";
import { Field, reduxForm } from "redux-form";
import { PostType } from "../../../types/types";
import { maxLengthCreator, required } from "../../../utils/validators/validators";
import { Textarea } from "../../common/FormsControls/FormsControls";
import style from "./MyPosts.module.css";
import Post from "./Post/Post";

type MyPostsPropsType = {
  posts: Array<PostType>,
  addPost: (values: any) => void,
}

const MyPosts: React.FC<MyPostsPropsType> = React.memo((props) => {
  let postsElements = [...props.posts]
    .reverse()
    .map((post) => <Post message={post.message} key={post.id} like={post.likesCount} />);

  let onAddPost = (values: any) => {
    props.addPost(values.newPostText);
  };
  return (
    <div className={style.postsBlock}>
      <h3>My Posts</h3>
      <AddNewPostFormRedux onSubmit={onAddPost} />
      <div className={style.posts}>{postsElements}</div>
    </div>
  );
});

const maxLength10 = maxLengthCreator(10);

let AddNewPostForm = (props: any) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          name={"newPostText"}
          placeholder={"enter your post"}
          component={Textarea}
          validate={[required, maxLength10]}
        />
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  );
};

const AddNewPostFormRedux = reduxForm({ form: "ProfileAddNewPostForm" })(AddNewPostForm);

export default MyPosts;
