import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch, withRouter } from "react-router";
import { compose } from "redux";
import "./App.css";
import Preloader from "./components/common/Preloader/Preloader";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginContainer from "./components/Login/LoginContainer";
import Music from "./components/Music/Music";
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import UsersContainer from "./components/Users/UsersContainer";
import { initializeApp } from "./redux/appReducer";
import store from "./redux/redux-store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { withSuspense } from "./hoc/withSuspense";

const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          <Switch>
            <Route exact path="/react-social-network" render={() => <Redirect to="/profile" />} />
            <Route path="/profile/:userId?" render={withSuspense(ProfileContainer)} />
            <Route path="/dialogs" render={withSuspense(DialogsContainer)} />
            <Route path="/users" render={() => <UsersContainer />} />
            <Route path="/login" render={() => <LoginContainer />} />
            <Route path="/news" render={() => <News />} />
            <Route path="/music" render={() => <Music />} />
            <Route path="/settings" render={() => <Settings />} />
            <Route path="*" render={() => <div>ERROR 404: PAGE NOT FOUND</div>} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
});

let AppContainer = compose(withRouter, connect(mapStateToProps, { initializeApp }))(App);

let SocialNetworkApp = (props) => {
  return (
    <BrowserRouter>
      <React.StrictMode>
        <Provider store={store}>
          <AppContainer />
        </Provider>
      </React.StrictMode>
    </BrowserRouter>
  );
};

export default SocialNetworkApp;
