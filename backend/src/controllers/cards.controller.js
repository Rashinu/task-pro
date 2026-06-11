import { Column } from "../models/column.model.js";
import { Card } from "../models/card.model.js";
import { HttpError } from "../utils/HttpError.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const create = async (req, res) => {
  const { columnId } = req.params;

  const column = await Column.findOne({
    _id: columnId,
    owner: req.user._id,
  });
  if (!column) {
    throw new HttpError(404, "Column not found");
  }

  const card = await Card.create({
    ...req.body,
    columnId: column._id,
    boardId: column.boardId,
    owner: req.user._id,
  });

  res.status(201).json(card);
};

const update = async (req, res) => {
  const { cardId } = req.params;

  const card = await Card.findOneAndUpdate(
    { _id: cardId, owner: req.user._id },
    req.body,
    { new: true }
  );

  if (!card) {
    throw new HttpError(404, "Card not found");
  }

  res.json(card);
};

const remove = async (req, res) => {
  const { cardId } = req.params;

  const card = await Card.findOneAndDelete({
    _id: cardId,
    owner: req.user._id,
  });

  if (!card) {
    throw new HttpError(404, "Card not found");
  }

  res.json(card);
};

const move = async (req, res) => {
  const { cardId } = req.params;
  const { columnId } = req.body;

  const card = await Card.findOne({ _id: cardId, owner: req.user._id });
  if (!card) {
    throw new HttpError(404, "Card not found");
  }

  const targetColumn = await Column.findOne({
    _id: columnId,
    owner: req.user._id,
    boardId: card.boardId,
  });
  if (!targetColumn) {
    throw new HttpError(404, "Target column not found");
  }

  card.columnId = targetColumn._id;
  await card.save();

  res.json(card);
};

export default {
  create: ctrlWrapper(create),
  update: ctrlWrapper(update),
  remove: ctrlWrapper(remove),
  move: ctrlWrapper(move),
};
