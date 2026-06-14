import { Icon } from "../Icon/Icon";
import { PRIORITY_OPTIONS } from "../../constants/boardOptions";
import css from "./FiltersPanel.module.css";

const PRIORITY_COLOR_VAR = {
  without: "var(--priority-without)",
  low: "var(--priority-low)",
  medium: "var(--priority-medium)",
  high: "var(--priority-high)",
};

export const FiltersPanel = ({ value, onChange, onClose }) => (
  <div className={css.panel}>
    <div className={css.header}>
      <h3 className={css.title}>Filters</h3>
      <button
        type="button"
        className={css.closeButton}
        onClick={onClose}
        aria-label="Close filters"
      >
        <Icon name="icon-x" />
      </button>
    </div>

    <div className={css.subHeader}>
      <span className={css.subTitle}>Label color</span>
      <button type="button" className={css.showAll} onClick={() => onChange("all")}>
        Show all
      </button>
    </div>

    <div className={css.options}>
      {PRIORITY_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`${css.option} ${
            value === option.value ? css.optionActive : ""
          }`}
          onClick={() => onChange(option.value)}
        >
          <span
            className={css.radio}
            style={{ borderColor: PRIORITY_COLOR_VAR[option.value] }}
          >
            <span
              className={css.radioDot}
              style={{ backgroundColor: PRIORITY_COLOR_VAR[option.value] }}
            />
          </span>
          {option.label}
        </button>
      ))}
    </div>
  </div>
);
