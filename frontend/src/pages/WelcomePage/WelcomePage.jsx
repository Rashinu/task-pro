import { Link } from "react-router-dom";
import { Icon } from "../../components/Icon/Icon";
import css from "./WelcomePage.module.css";

const WelcomePage = () => (
  <div className={css.page}>
    <div className={css.content}>
      <div className={css.illustration} aria-hidden="true">
        <Icon name="icon-board" className={css.illustrationIcon} />
      </div>

      <div className={css.logo}>
        <span className={css.logoIcon}>
          <Icon name="icon-logo" />
        </span>
        <span>Task Pro</span>
      </div>

      <p className={css.subtitle}>
        Supercharge your productivity and take control of your tasks with
        Task Pro - Don&apos;t wait, start achieving your goals now!
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
);

export default WelcomePage;
