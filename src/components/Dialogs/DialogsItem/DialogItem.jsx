import { NavLink } from "react-router-dom";
import style from "../Dialogs.module.css";

const DialogItem = (props) => {
  let path = "/dialogs/" + props.id;

  return (
    <div className={style.dialog}>
      <NavLink to={path} activeClassName={style.activeLink}>
        {props.name}
      </NavLink>
    </div>
  );
};

export default DialogItem;
