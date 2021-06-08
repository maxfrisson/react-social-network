import React from "react";
import { PostType } from "../../../types/types";
import AddPostForm, { AddPostFormValuesType } from "./AddPostForm/AddPostForm";
import style from "./MyPosts.module.css";
import Post from "./Post/Post";

type MyPostsPropsType = {
  posts: Array<PostType>,
  addPost: (newPostText: string) => void,
}

const MyPosts: React.FC<MyPostsPropsType> = React.memo((props) => {
  let postsElements = [...props.posts]
    .reverse()
    .map((post) => <Post message={post.message} key={post.id} like={post.likesCount} />);

  let onAddPost = (values: AddPostFormValuesType) => {
    props.addPost(values.newPostText);
  };
  return (
    <div className={style.postsBlock}>
      <h3>My Posts</h3>
      <AddPostForm onSubmit={onAddPost} />
      <div className={style.posts}>{postsElements}</div>
    </div>
  );
});

export default MyPosts;
