import { useState } from "react";
import { Icon } from "../Icon/Icon";
import { Card } from "../Card/Card";
import { CardModal } from "../CardModal/CardModal";
import { ColumnModal } from "../ColumnModal/ColumnModal";
import { matchesDateFilter } from "../../utils/dateFilters";
import css from "./Column.module.css";

export const Column = ({ column, columns, boardId, dateFilter }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);

  const cards = column.cards.filter((card) =>
    matchesDateFilter(card.deadline, dateFilter)
  );

  return (
    <div className={css.column}>
      <div className={css.header}>
        <h3 className={css.title}>{column.title}</h3>
        <button
          type="button"
          className={css.editButton}
          onClick={() => setIsEditOpen(true)}
          aria-label="Edit column"
        >
          <Icon name="icon-edit" />
        </button>
      </div>

      <div className={css.cardList}>
        {cards.map((card) => (
          <Card key={card._id} card={card} columns={columns} />
        ))}
      </div>

      <button
        type="button"
        className={css.addCardButton}
        onClick={() => setIsAddCardOpen(true)}
      >
        <span className={css.addIcon}>
          <Icon name="icon-plus" />
        </span>
        Add another card
      </button>

      {isEditOpen && (
        <ColumnModal
          boardId={boardId}
          column={column}
          onClose={() => setIsEditOpen(false)}
        />
      )}

      {isAddCardOpen && (
        <CardModal
          columnId={column._id}
          onClose={() => setIsAddCardOpen(false)}
        />
      )}
    </div>
  );
};
