import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { register, login, logout, refreshCurrentUser } from './authOperations';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLogin: false,
  isCurrentLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  extraReducers: builder => {
    builder
      .addCase(refreshCurrentUser.pending, state => {
        state.isCurrentLoading = true;
      })
      .addCase(refreshCurrentUser.rejected, state => {
        state.isCurrentLoading = false;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLogin = true;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLogin = true;
      })
      .addCase(logout.fulfilled, state => {
        state.user.name = null;
        state.user.email = null;
        state.token = null;
        state.isLogin = false;
      })
      .addCase(refreshCurrentUser.fulfilled, (state, { payload }) => {
        state.user.name = payload.name;
        state.user.email = payload.email;
        state.isLogin = true;
        state.isCurrentLoading = false;
      })
      .addMatcher(
        action => {
          if (
            action.type.startsWith('auth') &&
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
  //   [refreshCurrentUser.pending](state) {
  //     state.isCurrentLoading = true;
  //   },
  //   [refreshCurrentUser.rejected](state) {
  //     state.isCurrentLoading = false;
  //   },
  //   [login.fulfilled](state, { payload }) {
  //     state.user = payload.user;
  //     state.token = payload.token;
  //     state.isLogin = true;
  //   },
  //   [register.fulfilled](state, { payload }) {
  //     state.user = payload.user;
  //     state.token = payload.token;
  //     state.isLogin = true;
  //   },
  //   [logout.fulfilled](state) {
  //     state.user.name = null;
  //     state.user.email = null;
  //     state.token = null;
  //     state.isLogin = false;
  //   },
  //   [refreshCurrentUser.fulfilled](state, { payload }) {
  //     state.user.name = payload.name;
  //     state.user.email = payload.email;
  //     state.isLogin = true;
  //     state.isCurrentLoading = false;
  //   },
  // },
});
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

export const authReducer = persistReducer(authPersistConfig, authSlice.reducer);
