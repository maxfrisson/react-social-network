import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
// import { usersAPI } from "../../api/api";
import { userProfile } from "../../redux/profileReducer";
import Profile from "./Profile";

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = 2;
    }
    this.props.userProfile(userId);

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

let WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, { userProfile })(WithUrlDataContainerComponent);
