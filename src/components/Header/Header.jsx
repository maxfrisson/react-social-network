import { NavLink } from "react-router-dom";
import style from "./Header.module.css";
import logo from '../../assets/images/logo.png';

const Header = (props) => {
  return (
    <header className={style.header}>
      <img
        className={style.image}
        src={logo}
        alt=""
      />
      <div className={style.loginBlock}>
        {props.isAuth ? <div>{props.login} - <button onClick={props.logout} >Log out</button></div> : <NavLink to="/login">Login</NavLink>}
      </div>
    </header>
  );
};

export default Header;
