import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Modal } from "../Modal/Modal";
import { CardForm } from "../CardForm/CardForm";
import {
  createCard,
  deleteCard,
  updateCard,
} from "../../redux/boards/boardsOperations";
import { selectBoardsLoading } from "../../redux/boards/boardsSelectors";
import css from "../Modal/ModalForm.module.css";

export const CardModal = ({ columnId, card, onClose }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectBoardsLoading);
  const isEdit = Boolean(card);

  const handleSubmit = async (payload) => {
    const action = isEdit
      ? updateCard({ cardId: card._id, ...payload })
      : createCard({ columnId, ...payload });

    const result = await dispatch(action);
    if (
      (isEdit && updateCard.fulfilled.match(result)) ||
      (!isEdit && createCard.fulfilled.match(result))
    ) {
      onClose();
    } else {
      toast.error(result.payload || "Something went wrong");
    }
  };

  const handleDelete = async () => {
    const result = await dispatch(deleteCard(card._id));
    if (deleteCard.fulfilled.match(result)) {
      onClose();
    } else {
      toast.error(result.payload || "Failed to delete card");
    }
  };

  return (
    <Modal onClose={onClose}>
      <h2 className={css.title}>{isEdit ? "Edit card" : "Add card"}</h2>
      <CardForm
        title={card?.title}
        description={card?.description}
        priority={card?.priority}
        deadline={card?.deadline}
        submitLabel={isEdit ? "Save" : "Create"}
        isLoading={isLoading}
        onSubmit={handleSubmit}
      />
      {isEdit && (
        <button
          type="button"
          className={css.deleteButton}
          onClick={handleDelete}
          disabled={isLoading}
        >
          Delete card
        </button>
      )}
    </Modal>
  );
};
