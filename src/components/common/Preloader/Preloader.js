import preloader from "../../../assets/images/preloader.gif";
import style from './Preloader.module.css'

let Preloader = (props) => {
  return <div className={style.preloaderContainer}>
    <img src={preloader} alt="" />
  </div>
};

export default Preloader;