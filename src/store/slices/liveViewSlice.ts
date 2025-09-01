import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface LiveViewState {
  currentPage: number;
}

const initialState: LiveViewState = {
  currentPage: 1,
};

const liveViewSlice = createSlice({
  name: 'liveView',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const { setCurrentPage } = liveViewSlice.actions;
export default liveViewSlice.reducer;
