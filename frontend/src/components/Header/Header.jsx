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
  const [isThemeOpen, setIsThemeOpen] = useState(false);

  const activeTheme = THEMES.find(({ value }) => value === theme) ?? THEMES[0];

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

      <div className={css.themeDropdown}>
        <button
          type="button"
          className={css.themeButton}
          onClick={() => setIsThemeOpen((prev) => !prev)}
        >
          <Icon name={activeTheme.icon} />
          <span>{activeTheme.label}</span>
          <Icon name="icon-chevron-down" className={css.chevronIcon} />
        </button>

        {isThemeOpen && (
          <ul className={css.themeMenu}>
            {THEMES.map(({ value, label, icon }) => (
              <li key={value}>
                <button
                  type="button"
                  className={`${css.themeOption} ${
                    theme === value ? css.themeOptionActive : ""
                  }`}
                  onClick={() => {
                    dispatch(updateTheme(value));
                    setIsThemeOpen(false);
                  }}
                >
                  <Icon name={icon} />
                  <span>{label}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
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
