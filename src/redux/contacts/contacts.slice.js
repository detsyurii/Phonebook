import { createSlice } from '@reduxjs/toolkit';
import { STATUS } from 'constants/status.constants';
import { contactsInitState } from './contacts.init-state';
import {
  getContactsThunk,
  addContactThunk,
  deleteContactThunk,
} from './contacts.thunk';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitState,
  extraReducers: builder => {
    builder
      .addCase(getContactsThunk.pending, state => {
        state.status = STATUS.loading;
      })
      .addCase(getContactsThunk.fulfilled, (state, { payload }) => {
        state.status = STATUS.success;
        state.items = payload;
      })
      .addCase(getContactsThunk.rejected, state => {
        state.status = STATUS.error;
      })
      .addCase(addContactThunk.pending, state => {
        state.status = STATUS.loading;
      })
      .addCase(addContactThunk.fulfilled, (state, { payload }) => {
        state.status = STATUS.success;
        state.items.push(payload);
      })
      .addCase(addContactThunk.rejected, state => {
        state.status = STATUS.error;
      })
      .addCase(deleteContactThunk.pending, state => {
        state.status = STATUS.loading;
      })
      .addCase(deleteContactThunk.fulfilled, (state, { payload }) => {
        state.status = STATUS.success;
        state.items = state.items.filter(item => item.id !== payload.id);
      })
      .addCase(deleteContactThunk.rejected, state => {
        state.status = STATUS.error;
      });
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
