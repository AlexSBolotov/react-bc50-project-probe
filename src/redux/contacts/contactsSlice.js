import { createSlice } from '@reduxjs/toolkit';
import {
  fetchContacts,
  addContact,
  deleteContact,
  updateContact,
} from './contactOperations';

// const handlePending = state => {
//   state.isLoading = true;
// };
// const handleRejected = (state, { payload }) => {
//   state.isLoading = false;
//   state.error = payload;
// };

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.items = payload;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.items.push(payload);
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        const index = state.items.findIndex(
          contact => contact.id === payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(updateContact.fulfilled, (state, { payload }) => {
        const index = state.items.findIndex(
          contact => contact.id === payload.id
        );
        state.items.splice(index, 1, payload);
      })
      .addMatcher(
        action => {
          if (
            action.type.startsWith('contacts') &&
            action.type.endsWith('/fulfilled')
          )
            return true;
        },
        state => {
          state.isLoading = false;
          state.error = null;
        }
      )
      .addMatcher(
        action => {
          if (
            action.type.startsWith('contacts') &&
            action.type.endsWith('/pending')
          )
            return true;
        },
        state => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        action => {
          if (
            action.type.startsWith('contacts') &&
            action.type.endsWith('/rejected')
          )
            return true;
        },
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
        }
      );
  },
  // {
  //   [fetchContacts.pending]: handlePending,
  //   [addContact.pending]: handlePending,
  //   [deleteContact.pending]: handlePending,

  //   [fetchContacts.rejected]: handleRejected,
  //   [addContact.rejected]: handleRejected,
  //   [deleteContact.rejected]: handleRejected,

  //   [fetchContacts.fulfilled](state, { payload }) {
  //     state.isLoading = false;
  //     state.error = null;
  //     state.items = payload;
  //   },
  //   [addContact.fulfilled](state, { payload }) {
  //     state.isLoading = false;
  //     state.error = null;
  //     state.items.push(payload);
  //   },
  //   [deleteContact.fulfilled](state, { payload }) {
  //     state.isLoading = false;
  //     state.error = null;
  //     const index = state.items.findIndex(contact => contact.id === payload.id);
  //     state.items.splice(index, 1);
  //   },
  //   [updateContact.fulfilled](state, { payload }) {
  //     state.isLoading = false;
  //     state.error = null;
  //     const index = state.items.findIndex(contact => contact.id === payload.id);
  //     state.items.splice(index, 1, payload);
  //   },
  // },
});

export const contactsReducer = contactsSlice.reducer;
