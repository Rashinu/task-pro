import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/api";

const extractErrorMessage = (error) =>
  error.response?.data?.message || error.message || "Something went wrong";

export const fetchBoards = createAsyncThunk(
  "boards/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/boards");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const fetchBoardById = createAsyncThunk(
  "boards/fetchById",
  async (boardId, thunkAPI) => {
    try {
      const { data } = await api.get(`/boards/${boardId}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const createBoard = createAsyncThunk(
  "boards/create",
  async (payload, thunkAPI) => {
    try {
      const { data } = await api.post("/boards", payload);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const updateBoard = createAsyncThunk(
  "boards/update",
  async ({ boardId, ...payload }, thunkAPI) => {
    try {
      const { data } = await api.patch(`/boards/${boardId}`, payload);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const deleteBoard = createAsyncThunk(
  "boards/delete",
  async (boardId, thunkAPI) => {
    try {
      await api.delete(`/boards/${boardId}`);
      return boardId;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const createColumn = createAsyncThunk(
  "columns/create",
  async ({ boardId, ...payload }, thunkAPI) => {
    try {
      const { data } = await api.post(`/boards/${boardId}/columns`, payload);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const updateColumn = createAsyncThunk(
  "columns/update",
  async ({ columnId, ...payload }, thunkAPI) => {
    try {
      const { data } = await api.patch(`/columns/${columnId}`, payload);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const deleteColumn = createAsyncThunk(
  "columns/delete",
  async (columnId, thunkAPI) => {
    try {
      await api.delete(`/columns/${columnId}`);
      return columnId;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const createCard = createAsyncThunk(
  "cards/create",
  async ({ columnId, ...payload }, thunkAPI) => {
    try {
      const { data } = await api.post(`/columns/${columnId}/cards`, payload);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const updateCard = createAsyncThunk(
  "cards/update",
  async ({ cardId, ...payload }, thunkAPI) => {
    try {
      const { data } = await api.patch(`/cards/${cardId}`, payload);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const deleteCard = createAsyncThunk(
  "cards/delete",
  async (cardId, thunkAPI) => {
    try {
      await api.delete(`/cards/${cardId}`);
      return cardId;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const moveCard = createAsyncThunk(
  "cards/move",
  async ({ cardId, columnId }, thunkAPI) => {
    try {
      const { data } = await api.patch(`/cards/${cardId}/move`, { columnId });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);
