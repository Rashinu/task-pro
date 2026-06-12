import { useState } from "react";
import { Icon } from "../Icon/Icon";
import { Column } from "../Column/Column";
import { ColumnModal } from "../ColumnModal/ColumnModal";
import css from "./MainDashboard.module.css";

export const MainDashboard = ({ board, priorityFilter }) => {
  const [isAddColumnOpen, setIsAddColumnOpen] = useState(false);

  return (
    <div className={css.main}>
      {board.columns.map((column) => (
        <Column
          key={column._id}
          column={column}
          columns={board.columns}
          boardId={board._id}
          priorityFilter={priorityFilter}
        />
      ))}

      <button
        type="button"
        className={css.addColumnButton}
        onClick={() => setIsAddColumnOpen(true)}
      >
        <span className={css.addIcon}>
          <Icon name="icon-plus" />
        </span>
        Add another column
      </button>

      {isAddColumnOpen && (
        <ColumnModal
          boardId={board._id}
          onClose={() => setIsAddColumnOpen(false)}
        />
      )}
    </div>
  );
};
