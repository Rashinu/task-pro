import { createSlice } from "@reduxjs/toolkit";
import {
  createBoard,
  createCard,
  createColumn,
  deleteBoard,
  deleteCard,
  deleteColumn,
  fetchBoardById,
  fetchBoards,
  moveCard,
  updateBoard,
  updateCard,
  updateColumn,
} from "./boardsOperations";

const initialState = {
  items: [],
  current: null,
  isLoading: false,
  isLoadingCurrent: false,
  error: null,
};

const setPending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const setRejected = (state, action) => {
  state.isLoading = false;
  state.isLoadingCurrent = false;
  state.error = action.payload;
};

const findColumn = (state, columnId) =>
  state.current?.columns?.find((column) => column._id === columnId);

const findColumnByCardId = (state, cardId) =>
  state.current?.columns?.find((column) =>
    column.cards.some((card) => card._id === cardId)
  );

const slice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    clearCurrentBoard(state) {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.pending, setPending)
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchBoards.rejected, setRejected)

      .addCase(fetchBoardById.pending, (state) => {
        state.isLoadingCurrent = true;
        state.error = null;
      })
      .addCase(fetchBoardById.fulfilled, (state, action) => {
        state.isLoadingCurrent = false;
        state.current = action.payload;
      })
      .addCase(fetchBoardById.rejected, setRejected)

      .addCase(createBoard.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      .addCase(updateBoard.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (board) => board._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...action.payload };
        }
        if (state.current?._id === action.payload._id) {
          state.current = { ...state.current, ...action.payload };
        }
      })

      .addCase(deleteBoard.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (board) => board._id !== action.payload
        );
        if (state.current?._id === action.payload) {
          state.current = null;
        }
      })

      .addCase(createColumn.fulfilled, (state, action) => {
        state.current?.columns.push(action.payload);
      })

      .addCase(updateColumn.fulfilled, (state, action) => {
        const column = findColumn(state, action.payload._id);
        if (column) {
          column.title = action.payload.title;
        }
      })

      .addCase(deleteColumn.fulfilled, (state, action) => {
        if (state.current) {
          state.current.columns = state.current.columns.filter(
            (column) => column._id !== action.payload
          );
        }
      })

      .addCase(createCard.fulfilled, (state, action) => {
        const column = findColumn(state, action.payload.columnId);
        column?.cards.push(action.payload);
      })

      .addCase(updateCard.fulfilled, (state, action) => {
        const column = findColumnByCardId(state, action.payload._id);
        if (column) {
          const index = column.cards.findIndex(
            (card) => card._id === action.payload._id
          );
          column.cards[index] = action.payload;
        }
      })

      .addCase(deleteCard.fulfilled, (state, action) => {
        const column = findColumnByCardId(state, action.payload);
        if (column) {
          column.cards = column.cards.filter(
            (card) => card._id !== action.payload
          );
        }
      })

      .addCase(moveCard.fulfilled, (state, action) => {
        const sourceColumn = findColumnByCardId(state, action.payload._id);
        if (sourceColumn) {
          sourceColumn.cards = sourceColumn.cards.filter(
            (card) => card._id !== action.payload._id
          );
        }
        const targetColumn = findColumn(state, action.payload.columnId);
        targetColumn?.cards.push(action.payload);
      });
  },
});

export const { clearCurrentBoard } = slice.actions;
export default slice.reducer;
