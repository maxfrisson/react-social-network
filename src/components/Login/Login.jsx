import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Field, reduxForm } from "redux-form";
import { login } from "../../redux/authReducer";
import { required } from "../../utils/validators/validators";
import { Input } from "../common/FormsControls/FormsControls";
import style from "./Login.module.css";

const LoginForm = (handleSubmit, error) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field name={"email"} placeholder={"Email"} component={Input} validate={[required]} />
      </div>
      <div>
        <Field
          name={"password"}
          placeholder={"Password"}
          type="password"
          component={Input}
          validate={[required]}
        />
      </div>
      <div>
        <Field name={"rememberMe"} type="checkbox" component={Input} /> remember me
      </div>
      {error && <div className={style.formSummaryError}>{error}</div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm({ form: "login" })(LoginForm);

const Login = (props) => {
  const onSubmit = (formData) => {
    props.login(formData.email, formData.password, formData.rememberMe);
  };

  if (props.isAuth) {
    return <Redirect to={"/profile"} />;
  }

  return (
    <div className={style.loginContent}>
      <h1>LOGIN</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Login);
