import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Icon } from "../Icon/Icon";
import { FiltersPanel } from "../FiltersPanel/FiltersPanel";
import { EditBoardModal } from "../EditBoardModal/EditBoardModal";
import { deleteBoard } from "../../redux/boards/boardsOperations";
import css from "./HeaderDashboard.module.css";

export const HeaderDashboard = ({ board, dateFilter, onFilterChange }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDelete = async () => {
    const result = await dispatch(deleteBoard(board._id));
    if (deleteBoard.fulfilled.match(result)) {
      navigate("/home");
    } else {
      toast.error(result.payload || "Failed to delete board");
    }
  };

  return (
    <div className={css.header}>
      <div className={css.boardInfo}>
        <Icon name={board.icon} className={css.icon} />
        <h1 className={css.title}>{board.title}</h1>
        <div className={css.boardActions}>
          <button
            type="button"
            className={css.iconButton}
            onClick={() => setIsEditOpen(true)}
            aria-label="Edit board"
          >
            <Icon name="icon-edit" />
          </button>
          <button
            type="button"
            className={css.iconButton}
            onClick={handleDelete}
            aria-label="Delete board"
          >
            <Icon name="icon-trash" />
          </button>
        </div>
      </div>

      <button
        type="button"
        className={`${css.filterButton} ${
          dateFilter !== "all" ? css.filterButtonActive : ""
        }`}
        onClick={() => setIsFiltersOpen((prev) => !prev)}
      >
        <Icon name="icon-filter" />
        Filters
      </button>

      {isFiltersOpen && (
        <FiltersPanel
          value={dateFilter}
          onChange={(value) => {
            onFilterChange(value);
            setIsFiltersOpen(false);
          }}
        />
      )}

      {isEditOpen && (
        <EditBoardModal board={board} onClose={() => setIsEditOpen(false)} />
      )}
    </div>
  );
};
