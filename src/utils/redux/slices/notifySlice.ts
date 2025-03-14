import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface notifySliceType {
  message: string;
  type: 'warning' | 'danger' | 'success' | string;
  loading: boolean;
}

const initialState: notifySliceType = {
  message: '',
  type: "",
  loading: false
};

const notifySlice = createSlice({
  name: 'notifyState',
  initialState,
  reducers: {
    setNotify: (state, action: PayloadAction<notifySliceType>) => {
      const { message, type, loading } = action.payload;
      state.message = message;
      state.type = type;
      state.loading = loading;
    }
  }
});

export const { setNotify } = notifySlice.actions;
export default notifySlice.reducer;
