import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type StageRow = {
  id: number;
  name: string;
};

type StagesState = {
  rows: StageRow[];
};

const initialState: StagesState = {
  rows: [],
};

const stageSlice = createSlice({
  name: "stages",

  initialState,

  reducers: {
    setstages: (state, action: PayloadAction<StageRow[]>) => {
      state.rows = action.payload;
    },
  },
  });

export const { setstages } = stageSlice.actions;

export default stageSlice.reducer;
