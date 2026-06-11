import { Link } from "react-router-dom";
import { Icon } from "../../components/Icon/Icon";
import css from "./WelcomePage.module.css";

const WelcomePage = () => (
  <div className={css.page}>
    <div className={css.logo}>
      <Icon name="icon-logo" className={css.logoIcon} />
      <span>Task Pro</span>
    </div>

    <div className={css.content}>
      <div className={css.illustration} aria-hidden="true">
        <Icon name="icon-board" className={css.illustrationIcon} />
      </div>

      <div className={css.text}>
        <h1 className={css.title}>
          Plan, manage, and accomplish your tasks with ease using TaskPro
        </h1>
        <p className={css.subtitle}>
          Effective task management leads to more done.
        </p>

        <div className={css.actions}>
          <Link to="/auth/register" className={css.primary}>
            Registration
          </Link>
          <Link to="/auth/login" className={css.secondary}>
            Log In
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default WelcomePage;
