import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authInitState } from './auth.init-state';
import { authLoginThunk, authLogoutThunk, getProfileThunk } from './auth.thunk';
import { STATUS } from 'constants/status.constants';

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitState,
  extraReducers: builder => {
    builder
      .addCase(authLoginThunk.pending, state => {
        state.status = STATUS.loading;
      })
      .addCase(authLoginThunk.fulfilled, (state, { payload }) => {
        state.status = STATUS.success;
        state.data = payload;
      })
      .addCase(authLoginThunk.rejected, state => {
        state.status = STATUS.error;
      })
      .addCase(authLogoutThunk.pending, state => {
        state.status = STATUS.loading;
      })
      .addCase(authLogoutThunk.fulfilled, state => authInitState)
      .addCase(authLogoutThunk.rejected, state => {
        state.status = STATUS.error;
      })
      .addCase(getProfileThunk.pending, state => {
        state.status = STATUS.loading;
      })
      .addCase(getProfileThunk.fulfilled, (state, { payload }) => {
        state.status = STATUS.success;
        state.profile = payload;
      })
      .addCase(getProfileThunk.rejected, state => authInitState);
  },
});

const persistConfig = {
  key: 'auth',
  storage,
};
export const persistedAuthReducer = persistReducer(
  persistConfig,
  authSlice.reducer
);
