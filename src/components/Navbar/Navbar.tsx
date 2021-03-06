import { NavLink } from 'react-router-dom';
import style from './Navbar.module.css';

const Navbar: React.FC = () => {
  return (
    <nav className={style.nav}>
        <div className={style.item}>
          <NavLink to="/profile" activeClassName={style.activeLink}>Profile</NavLink>
        </div>
        <div className={style.item}>
          <NavLink to="/dialogs" activeClassName={style.activeLink}>Messages</NavLink>
        </div>
        <div className={style.item}>
          <NavLink to="/users" activeClassName={style.activeLink}>Users</NavLink>
        </div>
        <div className={style.item}>
          <NavLink to="/music" activeClassName={style.activeLink}>Music</NavLink>
        </div>
      </nav>
  )
}

export default Navbar;