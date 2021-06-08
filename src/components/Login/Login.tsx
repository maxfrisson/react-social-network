import { connect } from "react-redux";
import { Redirect } from "react-router";
import { InjectedFormProps, reduxForm } from "redux-form";
import { login } from "../../redux/authReducer";
import { AppStateType } from "../../redux/redux-store";
import { required } from "../../utils/validators/validators";
import { createField, GetStringKeys, Input } from "../common/FormsControls/FormsControls";
import style from "./Login.module.css";

type LoginFormOwnPropsType = {
  captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnPropsType> & LoginFormOwnPropsType> = ({ handleSubmit, error, captchaUrl }) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField<LoginFormValuesTypeKeys>("Email", "email", [required], Input)}
      {createField<LoginFormValuesTypeKeys>("Password", "password", [required], Input, { type: "password" })}
      {createField<LoginFormValuesTypeKeys>(undefined, "rememberMe", [], Input, { type: "checkbox" }, "remember me")}

      {captchaUrl && <img src={captchaUrl} alt="captcha" />}
      {captchaUrl && createField<LoginFormValuesTypeKeys>("Symbols from image", "captcha", [required], Input, {})}

      {error && <div className={style.formSummaryError}>{error}</div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnPropsType>({ form: "login" })(LoginForm);

type MapStateToPropsType = {
  captchaUrl: string | null,
  isAuth: boolean,
}

type MapDispatchToPropsType = {
  login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

export type LoginFormValuesType = {
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: string
}

type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>;

const Login: React.FC<MapStateToPropsType & MapDispatchToPropsType> = (props) => {
  const onSubmit = (formData: LoginFormValuesType) => {
    props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
  };

  if (props.isAuth) {
    return <Redirect to={"/profile"} />;
  }

  return (
    <div className={style.loginContent}>
      <h1>LOGIN</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
  );
};

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  captchaUrl: state.auth.captchaUrl,
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Login);
