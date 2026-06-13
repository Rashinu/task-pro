import { Icon } from "../Icon/Icon";
import { DATE_FILTER_OPTIONS } from "../../utils/dateFilters";
import css from "./FiltersPanel.module.css";

export const FiltersPanel = ({ value, onChange }) => (
  <div className={css.panel}>
    <p className={css.title}>Filter by date</p>
    <button
      type="button"
      className={`${css.option} ${value === "all" ? css.optionActive : ""}`}
      onClick={() => onChange("all")}
    >
      <Icon name="icon-calendar" className={css.icon} />
      All
    </button>
    {DATE_FILTER_OPTIONS.map((option) => (
      <button
        key={option.value}
        type="button"
        className={`${css.option} ${
          value === option.value ? css.optionActive : ""
        }`}
        onClick={() => onChange(option.value)}
      >
        <Icon name="icon-calendar" className={css.icon} />
        {option.label}
      </button>
    ))}
  </div>
);
