import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Icon } from "../Icon/Icon";
import { CreateBoardModal } from "../CreateBoardModal/CreateBoardModal";
import { EditBoardModal } from "../EditBoardModal/EditBoardModal";
import { HelpModal } from "../HelpModal/HelpModal";
import { deleteBoard, fetchBoards } from "../../redux/boards/boardsOperations";
import { logOut } from "../../redux/auth/authOperations";
import { selectBoards } from "../../redux/boards/boardsSelectors";
import css from "./Sidebar.module.css";

export const Sidebar = ({ onNavigate }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { boardId } = useParams();
  const boards = useSelector(selectBoards);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingBoard, setEditingBoard] = useState(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  const handleDelete = async (board) => {
    const result = await dispatch(deleteBoard(board._id));
    if (deleteBoard.fulfilled.match(result)) {
      if (boardId === board._id) {
        navigate("/home");
      }
    } else {
      toast.error(result.payload || "Failed to delete board");
    }
  };

  return (
    <div className={css.sidebar}>
      <div className={css.logo}>
        <Icon name="icon-logo" className={css.logoIcon} />
        <span>Task Pro</span>
      </div>

      <div className={css.sectionHeader}>
        <span className={css.sectionTitle}>My boards</span>
      </div>

      <button
        type="button"
        className={css.createButton}
        onClick={() => setIsCreateOpen(true)}
      >
        <span className={css.createIcon}>
          <Icon name="icon-plus" />
        </span>
        Create a new board
      </button>

      <ul className={css.list}>
        {boards.length === 0 && (
          <li className={css.emptyText}>No boards yet</li>
        )}
        {boards.map((board) => (
          <li key={board._id} className={css.item}>
            <NavLink
              to={`/home/${board._id}`}
              onClick={onNavigate}
              className={({ isActive }) =>
                `${css.link} ${isActive ? css.itemActive : ""}`
              }
            >
              <Icon name={board.icon} className={css.linkIcon} />
              <span className={css.linkTitle}>{board.title}</span>
            </NavLink>
            <div className={css.itemActions}>
              <button
                type="button"
                className={css.iconButton}
                onClick={() => setEditingBoard(board)}
                aria-label="Edit board"
              >
                <Icon name="icon-edit" />
              </button>
              <button
                type="button"
                className={css.iconButton}
                onClick={() => handleDelete(board)}
                aria-label="Delete board"
              >
                <Icon name="icon-trash" />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className={css.helpCard}>
        <div className={css.helpIcon}>
          <Icon name="icon-help" />
        </div>
        <p className={css.helpText}>
          If you need help with <strong>TaskPro</strong>, check out our
          support resources or reach out to our customer support team.
        </p>
        <button
          type="button"
          className={css.helpButton}
          onClick={() => setIsHelpOpen(true)}
        >
          <Icon name="icon-help" />
          <span>Need help?</span>
        </button>
      </div>

      <div className={css.footer}>
        <button
          type="button"
          className={css.footerButton}
          onClick={() => {
            dispatch(logOut());
            navigate("/welcome");
          }}
        >
          <Icon name="icon-logout" />
          <span>Log out</span>
        </button>
      </div>

      {isCreateOpen && (
        <CreateBoardModal
          onClose={() => setIsCreateOpen(false)}
          onCreated={(boardId) => navigate(`/home/${boardId}`)}
        />
      )}

      {editingBoard && (
        <EditBoardModal
          board={editingBoard}
          onClose={() => setEditingBoard(null)}
        />
      )}

      {isHelpOpen && <HelpModal onClose={() => setIsHelpOpen(false)} />}
    </div>
  );
};
