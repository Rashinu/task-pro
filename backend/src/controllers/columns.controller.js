import { Board } from "../models/board.model.js";
import { Column } from "../models/column.model.js";
import { Card } from "../models/card.model.js";
import { HttpError } from "../utils/HttpError.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const create = async (req, res) => {
  const { boardId } = req.params;

  const board = await Board.findOne({ _id: boardId, owner: req.user._id });
  if (!board) {
    throw new HttpError(404, "Board not found");
  }

  const column = await Column.create({
    ...req.body,
    boardId: board._id,
    owner: req.user._id,
  });

  res.status(201).json({ ...column.toObject(), cards: [] });
};

const update = async (req, res) => {
  const { columnId } = req.params;

  const column = await Column.findOneAndUpdate(
    { _id: columnId, owner: req.user._id },
    req.body,
    { new: true }
  );

  if (!column) {
    throw new HttpError(404, "Column not found");
  }

  res.json(column);
};

const remove = async (req, res) => {
  const { columnId } = req.params;

  const column = await Column.findOneAndDelete({
    _id: columnId,
    owner: req.user._id,
  });

  if (!column) {
    throw new HttpError(404, "Column not found");
  }

  await Card.deleteMany({ columnId: column._id });

  res.json(column);
};

export default {
  create: ctrlWrapper(create),
  update: ctrlWrapper(update),
  remove: ctrlWrapper(remove),
};
