import { Board } from "../models/board.model.js";
import { Column } from "../models/column.model.js";
import { Card } from "../models/card.model.js";
import { HttpError } from "../utils/HttpError.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const getAll = async (req, res) => {
  const boards = await Board.find({ owner: req.user._id });
  res.json(boards);
};

const getById = async (req, res) => {
  const { boardId } = req.params;

  const board = await Board.findOne({ _id: boardId, owner: req.user._id });
  if (!board) {
    throw new HttpError(404, "Board not found");
  }

  const columns = await Column.find({ boardId: board._id }).sort({
    createdAt: 1,
  });
  const cards = await Card.find({ boardId: board._id }).sort({
    createdAt: 1,
  });

  const columnsWithCards = columns.map((column) => ({
    ...column.toObject(),
    cards: cards.filter(
      (card) => card.columnId.toString() === column._id.toString()
    ),
  }));

  res.json({ ...board.toObject(), columns: columnsWithCards });
};

const create = async (req, res) => {
  const board = await Board.create({ ...req.body, owner: req.user._id });
  res.status(201).json(board);
};

const update = async (req, res) => {
  const { boardId } = req.params;

  const board = await Board.findOneAndUpdate(
    { _id: boardId, owner: req.user._id },
    req.body,
    { new: true }
  );

  if (!board) {
    throw new HttpError(404, "Board not found");
  }

  res.json(board);
};

const remove = async (req, res) => {
  const { boardId } = req.params;

  const board = await Board.findOneAndDelete({
    _id: boardId,
    owner: req.user._id,
  });

  if (!board) {
    throw new HttpError(404, "Board not found");
  }

  await Column.deleteMany({ boardId: board._id });
  await Card.deleteMany({ boardId: board._id });

  res.json(board);
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  create: ctrlWrapper(create),
  update: ctrlWrapper(update),
  remove: ctrlWrapper(remove),
};
