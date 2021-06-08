import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { compose } from "redux";
import {
  getStatus,
  getUserProfile,
  saveAvatar,
  saveProfile,
  updateStatus,
} from "../../redux/profileReducer";
import { AppStateType } from "../../redux/redux-store";
import { ProfileType } from "../../types/types";
import Profile from "./Profile";

type MapPropsType = ReturnType<typeof mapStateToProps>;

type DispatchPropsType = {
  getUserProfile: (userId: number) => void;
  getStatus: (userId: number) => void;
  updateStatus: (status: string) => void;
  saveAvatar: (file: File) => void;
  saveProfile: (profile: ProfileType) => Promise<any>;
};

type PathParamsType = {
  userId: string;
};
type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>;

class ProfileContainer extends React.Component<PropsType> {
  refreshProfile() {
    let userId: number | null = +this.props.match.params.userId;
    if (!userId) {
      userId = this.props.authorizedUserId;
      if (!userId) {
        this.props.history.push("/login");
      }
    }
    if (!userId) {
      console.error("ID should be exists in URI params or in state ('authorizedId')");
    } else {
      this.props.getUserProfile(userId);
      this.props.getStatus(userId);
    }
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    return (
      <div>
        <Profile
          {...this.props}
          isOwner={!this.props.match.params.userId}
          profile={this.props.profile}
          status={this.props.status}
          updateStatus={this.props.updateStatus}
          saveAvatar={this.props.saveAvatar}
          saveProfile={this.props.saveProfile}
        />
      </div>
    );
  }
}

let mapStateToProps = (state: AppStateType) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.id,
  isAuth: state.auth.isAuth,
});

export default compose<React.ComponentType>(
  connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, saveAvatar, saveProfile }),
  withRouter
)(ProfileContainer);
