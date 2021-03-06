import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { Redirect, Route, Switch, withRouter } from "react-router";
import { compose } from "redux";
import Preloader from "./components/common/Preloader/Preloader";
import { LoginPage } from "./components/Login/Login";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import { UsersPage } from "./components/Users/UsersContainer";
import { initializeApp } from "./redux/appReducer";
import store, { AppStateType } from "./redux/redux-store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { withSuspense } from "./hoc/withSuspense";

import { Layout } from "antd";
import { Header } from "./components/Header/Header";
const { Content, Footer} = Layout;

const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ChatPage = React.lazy(() => import("./pages/Chat/ChatPage"));

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
  initializeApp: () => void;
};

const SuspendedProfile = withSuspense(ProfileContainer);
const SuspendedDialogs = withSuspense(DialogsContainer);
const SuspendedChatPage = withSuspense(ChatPage);

class App extends React.Component<MapPropsType & DispatchPropsType> {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }

    return (
      <Layout>
        <Header />
        <Content style={{ padding: "0 50px", maxWidth: "1200px", margin: "0 auto" }}>
          <Layout className="site-layout-background" style={{ padding: "24px 0" }}>
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
              <Switch>
                <Route
                  exact
                  path="/react-social-network"
                  render={() => <Redirect to="/profile" />}
                />
                <Route path="/profile/:userId?" render={() => <SuspendedProfile />} />
                <Route path="/dialogs" render={() => <SuspendedDialogs />} />
                <Route path="/users" render={() => <UsersPage pageTitle={"????????????????????????"} />} />
                <Route path="/login" render={() => <LoginPage />} />
                <Route path="/news" render={() => <News />} />
                <Route path="/music" render={() => <Music />} />
                <Route path="/settings" render={() => <Settings />} />
                <Route path="/chat" render={() => <SuspendedChatPage />} />
                <Route path="*" render={() => <div>ERROR 404: PAGE NOT FOUND</div>} />
              </Switch>
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: "center" }}>Ant Design ??2018 Created by Ant UED</Footer>
      </Layout>

      // <div className="app-wrapper">
      //   <HeaderContainer />
      //   <Navbar />
      //   <div className="app-wrapper-content">
      // <Switch>
      //   <Route exact path="/react-social-network" render={() => <Redirect to="/profile" />} />
      //   <Route path="/profile/:userId?" render={() => <SuspendedProfile />} />
      //   <Route path="/dialogs" render={() => <SuspendedDialogs />} />
      //   <Route path="/users" render={() => <UsersPage pageTitle={"????????????????????????"} />} />
      //   <Route path="/login" render={() => <LoginPage />} />
      //   <Route path="/news" render={() => <News />} />
      //   <Route path="/music" render={() => <Music />} />
      //   <Route path="/settings" render={() => <Settings />} />
      //   <Route path="*" render={() => <div>ERROR 404: PAGE NOT FOUND</div>} />
      // </Switch>
      //   </div>
      // </div>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
});

let AppContainer = compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);

let SocialNetworkApp: React.FC = () => {
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
