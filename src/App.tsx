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
import { BrowserRouter, Link } from "react-router-dom";
import { Provider } from "react-redux";
import { withSuspense } from "./hoc/withSuspense";

import { Layout, Menu, Breadcrumb } from "antd";
import { UserOutlined, LaptopOutlined, NotificationOutlined } from "@ant-design/icons";
import { Header } from "./components/Header/Header";
const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;

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
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout className="site-layout-background" style={{ padding: "24px 0" }}>
            <Sider className="site-layout-background" width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%" }}
              >
                <SubMenu key="sub1" icon={<UserOutlined />} title="My Profile">
                  <Menu.Item key="1">
                    <Link to="/profile">Profile</Link>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Link to="/dialogs">Messages</Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<LaptopOutlined />} title="Developers">
                  <Menu.Item key="3">
                    <Link to="/users">Users</Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" icon={<NotificationOutlined />} title="Chat">
                  <Menu.Item key="4">
                    <Link to="/chat">Chat</Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu key="sub4" icon={<NotificationOutlined />} title="Music">
                  <Menu.Item key="5">
                    <Link to="/settings">Your music</Link>
                  </Menu.Item>
                  <Menu.Item key="6">
                    <Link to="/settings">Top tracks</Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu key="sub5" icon={<NotificationOutlined />} title="Settings">
                  <Menu.Item key="7">
                    <Link to="/settings">Settings</Link>
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
              <Switch>
                <Route
                  exact
                  path="/react-social-network"
                  render={() => <Redirect to="/profile" />}
                />
                <Route path="/profile/:userId?" render={() => <SuspendedProfile />} />
                <Route path="/dialogs" render={() => <SuspendedDialogs />} />
                <Route path="/users" render={() => <UsersPage pageTitle={"Пользователи"} />} />
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
        <Footer style={{ textAlign: "center" }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>

      // <div className="app-wrapper">
      //   <HeaderContainer />
      //   <Navbar />
      //   <div className="app-wrapper-content">
      // <Switch>
      //   <Route exact path="/react-social-network" render={() => <Redirect to="/profile" />} />
      //   <Route path="/profile/:userId?" render={() => <SuspendedProfile />} />
      //   <Route path="/dialogs" render={() => <SuspendedDialogs />} />
      //   <Route path="/users" render={() => <UsersPage pageTitle={"Пользователи"} />} />
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
