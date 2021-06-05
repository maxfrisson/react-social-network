import { connect } from "react-redux";
import { addPostActionCreator } from "../../../redux/profileReducer";
import { AppStateType } from "../../../redux/redux-store";
import MyPosts from "./MyPosts";

const mapStateToProps = (state: AppStateType) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addPost: (newPostText: string) => {
      dispatch(addPostActionCreator(newPostText));
    },
  };
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
