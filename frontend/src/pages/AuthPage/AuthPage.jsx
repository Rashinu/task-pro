import { Navigate, NavLink, useParams } from "react-router-dom";
import clsx from "clsx";
import { Icon } from "../../components/Icon/Icon";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import { RegisterForm } from "../../components/RegisterForm/RegisterForm";
import css from "./AuthPage.module.css";

const AuthPage = () => {
  const { id } = useParams();

  if (id !== "login" && id !== "register") {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div className={css.page}>
      <div className={css.card}>
        <div className={css.logo}>
          <Icon name="icon-logo" className={css.logoIcon} />
          <span>Task Pro</span>
        </div>

        <div className={css.tabs}>
          <NavLink
            to="/auth/login"
            className={({ isActive }) =>
              clsx(css.tab, isActive && css.tabActive)
            }
          >
            Log In
          </NavLink>
          <NavLink
            to="/auth/register"
            className={({ isActive }) =>
              clsx(css.tab, isActive && css.tabActive)
            }
          >
            Registration
          </NavLink>
        </div>

        {id === "login" ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
};

export default AuthPage;
