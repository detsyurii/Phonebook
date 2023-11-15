import { createAsyncThunk } from '@reduxjs/toolkit';
import { privateApi } from 'api/api';

export const getContactsThunk = createAsyncThunk(
  'contacts/fetchAll',
  async () => {
    const { data } = await privateApi.get('/contacts');
    return data;
  }
);

export const addContactThunk = createAsyncThunk(
  'contacts/addContact',
  async ({ id, name, number }) => {
    const { data } = await privateApi.post('/contacts', { id, name, number });
    return data;
  }
);
export const deleteContactThunk = createAsyncThunk(
  'contacts/deleteContact',
  async id => {
    const { data } = await privateApi.delete(`/contacts/${id}`);
    return data;
  }
);
