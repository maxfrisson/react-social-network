import { NavLink } from "react-router-dom";
import style from "./Header.module.css";
import logo from '../../assets/images/logo.png';

type PropsType = {
  isAuth: boolean,
  login: string | null,
  logout: () => void
}

const Header: React.FC<PropsType> = ({isAuth ,login ,logout}) => {
  return (
    <header className={style.header}>
      <img
        className={style.image}
        src={logo}
        alt=""
      /> 
      <div className={style.loginBlock}>
        {isAuth ? <div>{login} - <button onClick={logout} >Log out</button></div> : <NavLink to="/login">Login</NavLink>}
      </div>
    </header>
  );
};

export default Header;
