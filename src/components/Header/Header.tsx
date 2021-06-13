import { Link } from "react-router-dom";
import  Layout  from "antd/lib/layout/layout";
import { UserOutlined } from "@ant-design/icons";
import { Col, Menu, Row } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUserLogin, selectIsAuth } from "../../redux/authSelectors";
import { logout } from "../../redux/authReducer";
import React from "react";

export type MapPropsType = {}

export const Header: React.FC<MapPropsType> = (props) => {
  const isAuth = useSelector(selectIsAuth);
  const login = useSelector(selectCurrentUserLogin);
  
  const dispatch = useDispatch();
  const logoutCallback = () => {
    dispatch(logout());
  };
  
  const {Header}: any = Layout;

  return (
    <Header className="header">
      <div className="logo" />
      <Row>
        <Col span={20}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
            <Menu.Item key="1">
              <Link to="/profile">Profile</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/users">Users</Link>
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={4}>
          {isAuth ? (
            <div>
              <Avatar icon={<UserOutlined />} /> {login} - <button onClick={logoutCallback}>Log out</button>
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
