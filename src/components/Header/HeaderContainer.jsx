import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import { checkMeAuth } from "../../redux/authReducer";

class HeaderContainer extends React.Component {
  componentDidMount() {
    this.props.checkMeAuth();

    // usersAPI.checkMeAuth().then((response) => {
    //   if (response.data.resultCode === 0) {
    //     let { id, email, login } = response.data.data;
    //     this.props.setAuthUserData(id, email, login);
    //   }
    // });
  }

  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
});

export default connect(mapStateToProps, { checkMeAuth })(HeaderContainer);
