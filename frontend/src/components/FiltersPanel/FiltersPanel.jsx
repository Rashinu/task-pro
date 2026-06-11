import { PRIORITY_OPTIONS } from "../../constants/boardOptions";
import css from "./FiltersPanel.module.css";

const PRIORITY_COLOR_VAR = {
  without: "var(--priority-without)",
  low: "var(--priority-low)",
  medium: "var(--priority-medium)",
  high: "var(--priority-high)",
};

export const FiltersPanel = ({ value, onChange }) => (
  <div className={css.panel}>
    <p className={css.title}>Filter by priority</p>
    <button
      type="button"
      className={`${css.option} ${value === "all" ? css.optionActive : ""}`}
      onClick={() => onChange("all")}
    >
      <span className={css.dot} style={{ backgroundColor: "transparent" }} />
      All
    </button>
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
          className={css.dot}
          style={{ backgroundColor: PRIORITY_COLOR_VAR[option.value] }}
        />
        {option.label}
      </button>
    ))}
  </div>
);
