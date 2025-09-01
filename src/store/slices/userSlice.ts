import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../types/user.type';

interface UserState {
  data: User | null;
}

const storedUser = localStorage.getItem('user');
const initialState: UserState = {
  data: storedUser ? JSON.parse(storedUser) : null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.data = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
      console.log(JSON.stringify(action.payload));
      
    },
    clearUser(state) {
      state.data = null;
      localStorage.removeItem('user');
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
