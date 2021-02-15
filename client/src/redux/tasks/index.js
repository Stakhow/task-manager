import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api from '../../apiService';

const api = new Api();

export const getTasks = createAsyncThunk('tasks/get', async payload => {
  return await api.getTasks(payload);
});

export const createTask = createAsyncThunk('tasks/create', async payload => {
  return await api.createTask(payload);
});

export const editTask = createAsyncThunk('tasks/edit', async payload => {
  return await api.editTask(payload);
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    total: [],
    pages: 1,
    loading: false,
    error: false,
    success: false,
    message: '',
    statuses: {
      undone: 0,
      undoneEdited: 1,
      done: 10,
      doneEdited: 11,
    },
  },

  reducers: {
    resetLoadStatus: state => {
      state.error = false;
      state.success = false;
      state.message = false;
    },
  },

  extraReducers: {
    [getTasks.fulfilled]: (state, { payload }) => {
      state.tasks = payload.tasks;
      state.loading = false;
      state.total = Number(payload.total_task_count);
      state.error = false;
      state.pages =
        state.total && state.total % 3 === 0
          ? state.total / 3
          : Math.floor(state.total / 3) + 1;

      return state;
    },
    [getTasks.pending]: state => ({ ...state, loading: true }),

    [createTask.fulfilled]: (state, { payload }) => {
      state.tasks.push(payload);
      state.loading = false;
      state.error = false;
      state.success = true;
      state.message = 'Задача успешно добавлена';

      return state;
    },
    [createTask.pending]: state => ({ ...state, loading: true }),
    [createTask.rejected]: (state, { error }) => {
      state.loading = false;
      state.error = true;
      state.message = error.message;

      return state;
    },

    [editTask.fulfilled]: (state, { payload }) => {
      state.tasks = state.tasks.map(i => (i.id === payload.id ? payload : i));
      state.loading = false;
      state.error = false;
      state.success = true;
      state.message = 'Задача успешно отредактирована';

      return state;
    },
    [editTask.pending]: state => ({ ...state, loading: true }),
    [editTask.rejected]: (state, { error }) => {
      state.loading = false;
      state.success = false;
      state.error = true;
      state.message = error.message;

      return state;
    },
  },
});

export const { resetLoadStatus } = tasksSlice.actions;

export default tasksSlice;
