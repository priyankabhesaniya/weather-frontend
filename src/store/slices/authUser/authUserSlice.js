import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  auth: false,
  success: false,
  message: null,
  access_token: null,
  token_type: null,
  user: null,
  profile: null,
  user_permissions:null,
  city:'',
  recents:[]
};

export const authUserSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    addAuthData: (state, action) => {
      state.loading = false;
      state.auth = true;
      state.success = true;
      state.access_token = action.payload.access_token;
      state.token_type = action.payload.access_token;
      state.user = action.payload.user;
      state.city = action.payload.city; 
      state.recents = action.payload.recents;
    },
    resetAuthData: (state, action) => {
      state.loading = false;
      state.auth = false;
      state.success = false;
      state.access_token = null;
      state.token_type = null;
      state.user = null;
      state.city = '';
      state.recents = [];
    },
  },
});

export const { addAuthData, resetAuthData } = authUserSlice.actions;

export default authUserSlice.reducer;
