import { useState } from "react";
import { useDispatch } from "react-redux";
import { Icon } from "../Icon/Icon";
import { CardModal } from "../CardModal/CardModal";
import { moveCard } from "../../redux/boards/boardsOperations";
import css from "./Card.module.css";

const PRIORITY_COLOR_VAR = {
  without: "var(--priority-without)",
  low: "var(--priority-low)",
  medium: "var(--priority-medium)",
  high: "var(--priority-high)",
};

const PRIORITY_LABEL = {
  without: "Without priority",
  low: "Low",
  medium: "Medium",
  high: "High",
};

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

const isDueToday = (date) => {
  const today = new Date();
  const deadline = new Date(date);
  return (
    today.getFullYear() === deadline.getFullYear() &&
    today.getMonth() === deadline.getMonth() &&
    today.getDate() === deadline.getDate()
  );
};

export const Card = ({ card, columns }) => {
  const dispatch = useDispatch();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isMoveOpen, setIsMoveOpen] = useState(false);

  const otherColumns = columns.filter((column) => column._id !== card.columnId);

  const handleMove = (columnId) => {
    dispatch(moveCard({ cardId: card._id, columnId }));
    setIsMoveOpen(false);
  };

  return (
    <div className={css.card}>
      <span
        className={css.priorityBar}
        style={{ backgroundColor: PRIORITY_COLOR_VAR[card.priority] }}
      />

      <div className={css.header}>
        <h4 className={css.title}>{card.title}</h4>
        <button
          type="button"
          className={css.editButton}
          onClick={() => setIsEditOpen(true)}
          aria-label="Edit card"
        >
          <Icon name="icon-edit" />
        </button>
      </div>

      <p className={css.description}>{card.description}</p>

      <div className={css.footer}>
        <span className={css.priorityLabel}>
          <span
            className={css.priorityDot}
            style={{ backgroundColor: PRIORITY_COLOR_VAR[card.priority] }}
          />
          {PRIORITY_LABEL[card.priority]}
        </span>

        <div className={css.bottomRow}>
          <span className={css.dateRow}>
            <Icon name="icon-calendar" />
            {formatDate(card.deadline)}
            {isDueToday(card.deadline) && (
              <Icon name="icon-bell" className={css.bellIcon} />
            )}
          </span>

          <div className={css.actions}>
            {otherColumns.length > 0 && (
              <button
                type="button"
                className={css.iconButton}
                onClick={() => setIsMoveOpen((prev) => !prev)}
                aria-label="Move card"
              >
                <Icon name="icon-move" />
              </button>
            )}

            {isMoveOpen && (
              <ul className={css.moveMenu}>
                <li className={css.moveMenuTitle}>Move to</li>
                {otherColumns.map((column) => (
                  <li key={column._id}>
                    <button
                      type="button"
                      className={css.moveMenuItem}
                      onClick={() => handleMove(column._id)}
                    >
                      {column.title}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {isEditOpen && (
        <CardModal
          columnId={card.columnId}
          card={card}
          onClose={() => setIsEditOpen(false)}
        />
      )}
    </div>
  );
};
