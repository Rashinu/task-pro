import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Modal } from "../Modal/Modal";
import {
  createColumn,
  deleteColumn,
  updateColumn,
} from "../../redux/boards/boardsOperations";
import { selectBoardsLoading } from "../../redux/boards/boardsSelectors";
import css from "../Modal/ModalForm.module.css";

export const ColumnModal = ({ boardId, column, onClose }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectBoardsLoading);
  const isEdit = Boolean(column);
  const [title, setTitle] = useState(column?.title || "");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setError("Title is required");
      return;
    }

    const action = isEdit
      ? updateColumn({ columnId: column._id, title: trimmedTitle })
      : createColumn({ boardId, title: trimmedTitle });

    const result = await dispatch(action);
    if (
      (isEdit && updateColumn.fulfilled.match(result)) ||
      (!isEdit && createColumn.fulfilled.match(result))
    ) {
      onClose();
    } else {
      toast.error(result.payload || "Something went wrong");
    }
  };

  const handleDelete = async () => {
    const result = await dispatch(deleteColumn(column._id));
    if (deleteColumn.fulfilled.match(result)) {
      onClose();
    } else {
      toast.error(result.payload || "Failed to delete column");
    }
  };

  return (
    <Modal onClose={onClose}>
      <h2 className={css.title}>{isEdit ? "Edit column" : "Add column"}</h2>
      <form className={css.form} onSubmit={handleSubmit} noValidate>
        <div className={css.field}>
          <input
            className={`${css.input} ${error ? css.inputError : ""}`}
            type="text"
            placeholder="Title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setError("");
            }}
          />
          {error && <span className={css.error}>{error}</span>}
        </div>
        <button className={css.submit} type="submit" disabled={isLoading}>
          {isEdit ? "Save" : "Create"}
        </button>
      </form>
      {isEdit && (
        <button
          type="button"
          className={css.deleteButton}
          onClick={handleDelete}
          disabled={isLoading}
        >
          Delete column
        </button>
      )}
    </Modal>
  );
};
