import { NavLink } from "react-router-dom";
import style from "./Header.module.css";

const Header = (props) => {
  return (
    <header className={style.header}>
      <img
        className={style.image}
        src="https://cdn.logo.com/hotlink-ok/logo-social-sq.png"
        alt=""
      />
      <div className={style.loginBlock}>
        {props.isAuth ? props.login : <NavLink to="/login">Login</NavLink>}
      </div>
    </header>
  );
};

export default Header;
