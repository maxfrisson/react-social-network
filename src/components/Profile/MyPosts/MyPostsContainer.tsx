import { connect } from "react-redux";
import { actions } from "../../../redux/profileReducer";
import { AppStateType } from "../../../redux/redux-store";
import MyPosts, { DispatchPropsType, MapPropsType } from "./MyPosts";

type PropsType = {};

const mapStateToProps = (state: AppStateType) => {
  return {
    posts: state.profilePage.posts,
  };
};

const MyPostsContainer = connect<MapPropsType, DispatchPropsType, PropsType, AppStateType>(mapStateToProps, {
  addPost: actions.addPostActionCreator
})(MyPosts);

export default MyPostsContainer;
