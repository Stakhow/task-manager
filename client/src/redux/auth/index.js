import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api from '../../apiService';
import Cookie from 'js-cookie';

const api = new Api();

export const login = createAsyncThunk('auth/login', async payload => {
  return await api.login(payload);
});

const authToken = Cookie.get('token');

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: authToken ? authToken : null,
    isAdmin: !!authToken,
    isAuth: !!authToken,
    message: '',
    error: false,
    success: false,
  },
  reducers: {
    logout: state => {
      Cookie.remove('token');

      state.token = '';
      state.loading = false;
      state.isAdmin = false;
      state.isAuth = false;
      state.success = true;
      state.error = false;
      state.message = 'Вы успешно разлогинены';
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, { payload }) => {
      Cookie.set('token', payload.token);

      state.loading = false;
      state.isAdmin = true;
      state.isAuth = true;
      state.success = true;
      state.error = false;
      state.message = 'Вы успешно залогинены';

      return state;
    },
    [login.pending]: (state, payload) => {
      state.loading = true;
      state.error = false;

      return state;
    },

    [login.rejected]: (state, { error }) => {
      state.loading = false;
      state.error = true;
      state.message = error.message;
      state.success = false;

      return state;
    },
  },
});
export const { logout } = authSlice.actions;

export default authSlice;
