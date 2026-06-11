import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Icon } from "../Icon/Icon";
import { CreateBoardModal } from "../CreateBoardModal/CreateBoardModal";
import { EditBoardModal } from "../EditBoardModal/EditBoardModal";
import { HelpModal } from "../HelpModal/HelpModal";
import { fetchBoards } from "../../redux/boards/boardsOperations";
import { logOut } from "../../redux/auth/authOperations";
import { selectBoards } from "../../redux/boards/boardsSelectors";
import css from "./Sidebar.module.css";

export const Sidebar = ({ onNavigate }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const boards = useSelector(selectBoards);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingBoard, setEditingBoard] = useState(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  return (
    <div className={css.sidebar}>
      <div className={css.logo}>
        <Icon name="icon-logo" className={css.logoIcon} />
        <span>Task Pro</span>
      </div>

      <div className={css.sectionHeader}>
        <span className={css.sectionTitle}>My boards</span>
        <button
          type="button"
          className={css.addButton}
          onClick={() => setIsCreateOpen(true)}
          aria-label="Create new board"
        >
          <Icon name="icon-plus" />
        </button>
      </div>

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
            </div>
          </li>
        ))}
      </ul>

      <div className={css.footer}>
        <button
          type="button"
          className={css.footerButton}
          onClick={() => setIsHelpOpen(true)}
        >
          <Icon name="icon-help" />
          <span>Need help?</span>
        </button>
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
