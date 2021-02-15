import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    severity: 'success',
    message: 'test message',
    show: false,
  },
  reducers: {
    resetNotification: state => {
      state.message = '';
      state.show = false;

      return state;
    },
    showNotification: (state, { payload }) => {
      state.severity = payload.severity;
      state.message = payload.message;
      state.show = true;

      return state;
    },
  },
});

export const {
  showNotification,
  resetNotification,
} = notificationSlice.actions;

export default notificationSlice;
