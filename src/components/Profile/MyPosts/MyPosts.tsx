import React from "react";
import { PostType } from "../../../types/types";
import AddPostForm, { AddPostFormValuesType } from "./AddPostForm/AddPostForm";
import style from "./MyPosts.module.css";
import Post from "./Post/Post";


export type MapPropsType = {
  posts: Array<PostType>,
}

export type DispatchPropsType = {
  addPost: (newPostText: string) => void,
}

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = React.memo((props) => {
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
