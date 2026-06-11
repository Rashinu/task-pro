import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Modal } from "../Modal/Modal";
import { BoardForm } from "../BoardForm/BoardForm";
import { createBoard } from "../../redux/boards/boardsOperations";
import { selectBoardsLoading } from "../../redux/boards/boardsSelectors";
import css from "../Modal/ModalForm.module.css";

export const CreateBoardModal = ({ onClose, onCreated }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectBoardsLoading);

  const handleSubmit = async (payload) => {
    const result = await dispatch(createBoard(payload));
    if (createBoard.fulfilled.match(result)) {
      onCreated?.(result.payload._id);
      onClose();
    } else {
      toast.error(result.payload || "Failed to create board");
    }
  };

  return (
    <Modal onClose={onClose}>
      <h2 className={css.title}>New board</h2>
      <BoardForm
        submitLabel="Create"
        isLoading={isLoading}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
};
