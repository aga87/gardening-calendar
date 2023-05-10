import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  link: ''
};

const redirectSlice = createSlice({
  name: 'redirect',
  initialState,
  reducers: {
    setRedirectLink(state, action: PayloadAction<string>) {
      state.link = action.payload;
    },
    clearRedirectLink(state) {
      state.link = '';
    }
  }
});

export default redirectSlice.reducer;

export const { setRedirectLink, clearRedirectLink } = redirectSlice.actions;
