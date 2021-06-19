import React from "react";
import { Link } from "react-router-dom";
import {
  UserOutlined,
  UsergroupAddOutlined,
  WechatOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Button, Col, Layout, Menu, Row } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUserLogin, selectIsAuth } from "../../redux/authSelectors";
import { logout } from "../../redux/authReducer";
import logo from "../../assets/images/logo.png";
import style from "./Header.module.css";

export type MapPropsType = {};

export const Header: React.FC<MapPropsType> = (props) => {
  const isAuth = useSelector(selectIsAuth);
  const login = useSelector(selectCurrentUserLogin);

  const dispatch = useDispatch();
  const logoutCallback = () => {
    dispatch(logout());
  };

  const { Header } = Layout;

  return (
    <Header className="header">
      <Row>
        <Col span={2}>
          <Link to="/profile">
            <img className={style.logo} src={logo} alt="" />
          </Link>
        </Col>
        <Col span={18}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[""]}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              <Link to="/profile">Profile</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<MessageOutlined />}>
              <Link to="/dialogs">Message</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<UsergroupAddOutlined />}>
              <Link to="/users">Users</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<WechatOutlined />}>
              <Link to="/chat">Chat</Link>
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={4}>
          {isAuth ? (
            <div style={{ color: "#f0f2f5", fontSize: "1.5rem" }}>
              <Avatar icon={<UserOutlined />} /> {login} -{" "}
              <Button onClick={logoutCallback}>Log out</Button>
            </div>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </Col>
      </Row>
    </Header>

    // <header className={style.header}>
    //   <img
    //     className={style.image}
    //     src={logo}
    //     alt=""
    //   />
    //   <div className={style.loginBlock}>
    //     {isAuth ? <div>{login} - <button onClick={logout} >Log out</button></div> : <NavLink to="/login">Login</NavLink>}
    //   </div>
    // </header>
  );
};
