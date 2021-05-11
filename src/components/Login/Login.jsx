import { Field, reduxForm } from "redux-form";
import style from "./Login.module.css";

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field name={"login"} placeholder={"Login"} component={"input"} />
      </div>
      <div>
        <Field name={"password"} placeholder={"Password"} component={"input"} />
      </div>
      <div>
        <Field name={"rememberMe"} type="checkbox" component={"input"} /> remember me
      </div>
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm({ form: "login" })(LoginForm);

const Login = (props) => {
  const onSubmit = (formData) => {
    console.log(formData);
  }

  return (
    <div className={style.loginContent}>
      <h1>LOGIN</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};

export default Login;
