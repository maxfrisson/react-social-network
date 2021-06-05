import { connect } from "react-redux";
import { Redirect } from "react-router";
import { reduxForm } from "redux-form";
import { login } from "../../redux/authReducer";
import { AppStateType } from "../../redux/redux-store";
import { required } from "../../utils/validators/validators";
import { createField, Input } from "../common/FormsControls/FormsControls";
import style from "./Login.module.css";

type PropsType = {
  handleSubmit: any,
  error: string,
  captchaUrl?: string
}


const LoginForm: React.FC<PropsType> = ({ handleSubmit, error, captchaUrl }) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField("Email", "email", [required], Input)}
      {createField("Password", "password", [required], Input, { type: "password" })}
      {createField(null, "rememberMe", [], Input, { type: "checkbox" }, "remember me")}

      {captchaUrl && <img src={captchaUrl} alt="captcha" />}
      {captchaUrl && createField("Symbols from image", "captcha", [required], Input, {})}

      {error && <div className={style.formSummaryError}>{error}</div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm({ form: "login" })(LoginForm);

type LoginPropsType = {
  isAuth: boolean,
  login: any
}

const Login: React.FC<LoginPropsType> = (props) => {
  const onSubmit = (formData: any) => {
    props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
  };

  if (props.isAuth) {
    return <Redirect to={"/profile"} />;
  }

  return (
    <div className={style.loginContent}>
      <h1>LOGIN</h1>
      <LoginReduxForm onSubmit={onSubmit}/>
    </div>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  captchaUrl: state.auth.captchaUrl,
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Login);
