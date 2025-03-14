import { configureStore } from '@reduxjs/toolkit';
import notifyReducer from './slices/notifySlice';
import userReducer from './slices/userSlice'

export const store = configureStore({
  reducer: {
    notify: notifyReducer,
    user: userReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
