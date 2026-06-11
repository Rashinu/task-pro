import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "../Icon/Icon";
import { EditProfileModal } from "../EditProfileModal/EditProfileModal";
import { updateTheme } from "../../redux/auth/authOperations";
import { selectTheme, selectUser } from "../../redux/auth/authSelectors";
import css from "./Header.module.css";

const THEMES = [
  { value: "light", label: "Light", icon: "icon-sun" },
  { value: "violet", label: "Violet", icon: "icon-star" },
  { value: "dark", label: "Dark", icon: "icon-loading" },
];

export const Header = ({ onMenuClick }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const theme = useSelector(selectTheme);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className={css.header}>
      <button
        type="button"
        className={css.menuButton}
        onClick={onMenuClick}
        aria-label="Toggle menu"
      >
        <Icon name="icon-menu" />
      </button>

      <div className={css.themeSwitcher}>
        {THEMES.map(({ value, label, icon }) => (
          <button
            key={value}
            type="button"
            className={`${css.themeButton} ${
              theme === value ? css.themeButtonActive : ""
            }`}
            onClick={() => dispatch(updateTheme(value))}
          >
            <Icon name={icon} />
            <span>{label}</span>
          </button>
        ))}
      </div>

      <button
        type="button"
        className={css.userButton}
        onClick={() => setIsProfileOpen(true)}
      >
        <span className={css.avatar}>
          {user?.avatarURL ? (
            <img className={css.avatarImage} src={user.avatarURL} alt={user.name} />
          ) : (
            <Icon name="icon-user" className={css.avatarIcon} />
          )}
        </span>
        <span className={css.userName}>{user?.name}</span>
      </button>

      {isProfileOpen && (
        <EditProfileModal onClose={() => setIsProfileOpen(false)} />
      )}
    </header>
  );
};
