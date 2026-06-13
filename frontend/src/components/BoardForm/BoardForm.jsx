import { useState } from "react";
import { Icon } from "../Icon/Icon";
import { BOARD_BACKGROUNDS, BOARD_ICONS } from "../../constants/boardOptions";
import css from "../Modal/ModalForm.module.css";

export const BoardForm = ({
  title: initialTitle = "",
  icon: initialIcon = BOARD_ICONS[0],
  background: initialBackground = null,
  isLoading,
  submitLabel,
  onSubmit,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [icon, setIcon] = useState(initialIcon);
  const [background, setBackground] = useState(initialBackground);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setError("Title is required");
      return;
    }

    onSubmit({ title: trimmedTitle, icon, background });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit} noValidate>
      <div className={css.field}>
        <input
          className={`${css.input} ${error ? css.inputError : ""}`}
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            setError("");
          }}
        />
        {error && <span className={css.error}>{error}</span>}
      </div>

      <div className={css.field}>
        <span className={css.label}>Icons</span>
        <div className={css.swatchRow}>
          {BOARD_ICONS.map((iconName) => (
            <button
              key={iconName}
              type="button"
              className={`${css.swatch} ${
                icon === iconName ? css.swatchActive : ""
              }`}
              onClick={() => setIcon(iconName)}
              aria-label={iconName}
            >
              <Icon name={iconName} />
            </button>
          ))}
        </div>
      </div>

      <div className={css.field}>
        <span className={css.label}>Background</span>
        <div className={css.swatchRow}>
          {BOARD_BACKGROUNDS.map((bg) => (
            <button
              key={bg ?? "none"}
              type="button"
              className={`${css.bgSwatch} ${bg ? bg : css.bgSwatchNone} ${
                background === bg ? css.bgSwatchActive : ""
              }`}
              onClick={() => setBackground(bg)}
              aria-label={bg ?? "No background"}
            >
              {!bg && <Icon name="icon-x" />}
            </button>
          ))}
        </div>
      </div>

      <button className={css.submit} type="submit" disabled={isLoading}>
        <span className={css.submitIcon}>
          <Icon name="icon-plus" />
        </span>
        {submitLabel}
      </button>
    </form>
  );
};
