import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios"

export type TaskRow = {
  id: number;
  name: string;
  stageId: number;
  stage?: {
    id: number;
    name: string;
  };
};

type TodoState = {
  rows: TaskRow[];
};

const initialState: TodoState = {
  rows: [],
};

const API = "http://localhost:5000/api";

export const createTodo = createAsyncThunk(
  "todos/createTodo",
  async (data: { name: string; stageId: number }) => {
    const res = await axios.post<TaskRow>(`${API}/createtask`, data);
    return res.data;
  }
);

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (data: { id: number; name: string; stageId: number }) => {
    const res = await axios.put(`${API}/updatetask/${data.id}`, {
      name: data.name,
      stageId: data.stageId,
    });

    return res.data;
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id: number) => {
    await axios.delete(`${API}/deletetask/${id}`);
    return id;
  }
);

const todoSlice = createSlice({
  name: "todos",

  initialState,

  reducers: {
    setTodos: (state, action: PayloadAction<TaskRow[]>) => {
      state.rows = action.payload;
    },
  },
  
  extraReducers: (builder) => {
    builder

      .addCase(createTodo.fulfilled, (state, action) => {
        state.rows.push(action.payload);
      })

      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.rows.findIndex(
          (t) => t.id === action.payload.id
        );

        state.rows[index] = action.payload;
      })

      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.rows = state.rows.filter(
          (t) => t.id !== action.payload
        );
      });
  },
});

export const { setTodos } = todoSlice.actions;

export default todoSlice.reducer;
