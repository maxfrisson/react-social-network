import style from "./../Dialogs.module.css";

type PropsType = {
  message: string;
}

const Message: React.FC<PropsType> = ({message}) => {
  return <div className={style.message}>{message}</div>;
};

export default Message;
