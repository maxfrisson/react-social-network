import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
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

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
});

export default compose (
  connect(mapStateToProps, { getUserProfile }),
  withRouter,
  withAuthRedirect
) (ProfileContainer);

// let AuthRedirectComponent = withAuthRedirect(ProfileContainer);

// (props) => {
//   if (!this.props.isAuth) return <Redirect to="/login" />;
//   return <ProfileContainer {...props} />
// }

// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);

// export default connect(mapStateToProps, { getUserProfile })(WithUrlDataContainerComponent);
