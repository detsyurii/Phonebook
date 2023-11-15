import { createAsyncThunk } from '@reduxjs/toolkit';
import { privateApi, token } from 'api/api';
import { selectAuthData } from './auth.selectors';

export const authLoginThunk = createAsyncThunk('login', async values => {
  const { data } = await privateApi.post('/users/login', values);
  token.set(`Bearer ${data.token}`);
  return data;
});
export const authLogoutThunk = createAsyncThunk('logout', async () => {
  await privateApi.post('/users/logout');
  token.remove();
});

export const getProfileThunk = createAsyncThunk(
  'profile',
  async (_, { getState, rejectWithValue }) => {
    const stateToken = selectAuthData(getState());

    if (!stateToken) {
      return rejectWithValue;
    }

    token.set(`Bearer ${stateToken.token}`);
    const { data } = await privateApi.get('/users/current');
    return data;
  }
);
