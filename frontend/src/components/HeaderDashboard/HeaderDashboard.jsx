import { useState } from "react";
import { Icon } from "../Icon/Icon";
import { FiltersPanel } from "../FiltersPanel/FiltersPanel";
import css from "./HeaderDashboard.module.css";

export const HeaderDashboard = ({ board, priorityFilter, onFilterChange }) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  return (
    <div className={css.header}>
      <div className={css.boardInfo}>
        <Icon name={board.icon} className={css.icon} />
        <h1 className={css.title}>{board.title}</h1>
      </div>

      <button
        type="button"
        className={`${css.filterButton} ${
          priorityFilter !== "all" ? css.filterButtonActive : ""
        }`}
        onClick={() => setIsFiltersOpen((prev) => !prev)}
      >
        <Icon name="icon-filter" />
        Filters
      </button>

      {isFiltersOpen && (
        <FiltersPanel
          value={priorityFilter}
          onChange={(value) => {
            onFilterChange(value);
            setIsFiltersOpen(false);
          }}
        />
      )}
    </div>
  );
};
