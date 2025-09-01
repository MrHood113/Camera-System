// store/slices/authSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthState } from '../../types/authState.type';
import type { RoleEnum } from '../../types/roleEnum.type';

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  roleEnum: null,
  id: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string, roleEnum: RoleEnum; id: number }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      state.roleEnum = action.payload.roleEnum;
      state.id = action.payload.id;
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.roleEnum = null;
      state.id = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
