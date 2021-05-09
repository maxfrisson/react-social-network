import React from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router";
// import { usersAPI } from "../../api/api";
import { getUserProfile } from "../../redux/profileReducer";
import Profile from "./Profile";

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = 2;
    }
    this.props.getUserProfile(userId);

    // let userId = this.props.match.params.userId;
    // if (!userId) {
    //   userId = 2;
    // }
    // usersAPI.showUserProfile(userId).then((response) => {
    //   this.props.setUserProfile(response.data);
    // });
  }

  render() {
    
    return (
      <div>
        <Profile {...this.props} profile={this.props.profile} />
      </div>
    );
  }
}

let AuthRedirectComponent = (props) => {
  if (!this.props.isAuth) return <Redirect to="/login" />;
  return <ProfileContainer {...props} />
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  isAuth: state.auth.isAuth,
});

let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);

export default connect(mapStateToProps, { getUserProfile })(WithUrlDataContainerComponent);
