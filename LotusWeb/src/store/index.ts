import { configureStore } from '@reduxjs/toolkit';
import liveviewReducer from './slices/liveViewSlice';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import chartResponsiveReducer from './slices/chartResponsiveSlice';

export const store = configureStore({
  reducer: {
    liveView: liveviewReducer,
    auth: authReducer,
    user: userReducer,
    chartResponsive: chartResponsiveReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
