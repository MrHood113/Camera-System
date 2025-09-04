// chartResponsiveSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ChartResponsiveState {
  labelCount: number;
}

const initialState: ChartResponsiveState = {
  labelCount: 13,
};

const chartResponsiveSlice = createSlice({
  name: "chartResponsive",
  initialState,
  reducers: {
    setLabelCount: (state, action: PayloadAction<number>) => {
      state.labelCount = action.payload;
    },
  },
});

export const { setLabelCount } = chartResponsiveSlice.actions;
export default chartResponsiveSlice.reducer;
