import { useContext, useEffect, useReducer } from "react";
import AuthContext from "../../Context/Auth-Context";
import Button from "./includes/Button";
import Input from "./includes/Input";
import style from "./Login.module.css";

const checkReducer = (state, action) => {
  switch (action.type) {
    case "EMAIL_SAVE":
      return {
        email: action.value,
        valideEamil: action.valide,
        password: state.password,
        validePassword: state.validePassword,
        form: state.form,
      };
    case "PASSWORD_SAVE":
      return {
        email: state.email,
        valideEamil: state.valideEamil,
        password: action.value,
        validePassword: action.valide,
        form: state.form,
      };
    case "FORM_VALID":
      return {
        email: state.email,
        valideEamil: state.valideEamil,
        password: state.password,
        validePassword: state.validePassword,
        form: action.valide,
      };
    default:
      throw new Error();
  }
};

const Login = () => {
  const [checkLogin, dispatchCheck] = useReducer(checkReducer, {
    email: "",
    valideEamil: false,
    password: "",
    validePassword: false,
    form: false,
  });

  const ctx = useContext(AuthContext);

  const emailInput = (e) => {
    if (
      e.target.value.trim().includes("@") &&
      e.target.value.trim().length >= 6
    ) {
      dispatchCheck({
        type: "EMAIL_SAVE",
        value: e.target.value,
        valide: true,
      });
    } else {
      dispatchCheck({
        type: "EMAIL_SAVE",
        value: e.target.value,
        valide: false,
      });
    }
  };

  const passwordInput = (e) => {
    if (e.target.value.trim().length >= 6) {
      dispatchCheck({
        type: "PASSWORD_SAVE",
        value: e.target.value,
        valide: true,
      });
    } else {
      dispatchCheck({
        type: "PASSWORD_SAVE",
        value: e.target.value,
        valide: false,
      });
    }
  };

  useEffect(() => {
    const check = setTimeout(() => {
      if (
        checkLogin.valideEamil === true &&
        checkLogin.validePassword === true
      ) {
        dispatchCheck({ type: "FORM_VALID", valide: true });
      } else {
        dispatchCheck({ type: "FORM_VALID", valide: false });
      }
    }, 500);

    return () => {
      clearTimeout(check);
    };
  }, [checkLogin.valideEamil, checkLogin.validePassword]);

  const login = (e) => {
    e.preventDefault();
    if (checkLogin.form === true) {
      ctx.setIsLogin(true);
    } else {
      if (checkLogin.form === false) {
        return alert("?????????, ???????????? ??????????????????.");
      }
    }
  };

  return (
    <form onSubmit={login} className={style.loginForm}>
      <Input id="email" label="?????????" type="email" onInput={emailInput} />
      <Input
        id="password"
        label="????????????"
        type="password"
        onInput={passwordInput}
      />
      <div>
        <Button type="submit" name="?????????" />
      </div>
    </form>
  );
};

export default Login;
