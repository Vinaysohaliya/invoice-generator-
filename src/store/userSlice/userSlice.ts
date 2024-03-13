import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  email: string;
  isAuthenticated: boolean;
  error: string;
  id:string;
}

const initialState: UserState = {
  email: '',
  isAuthenticated: false,
  error: '',
  id:''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ email: string,id:string }>) => {
      state.email = action.payload.email;
      state.isAuthenticated = true;
      state.id=action.payload.id;
      state.error = '';
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    signupSuccess: (state, action: PayloadAction<{ email: string,id:string }>) => {
      state.email = action.payload.email;
      state.isAuthenticated = true;
      state.id=action.payload.id;

      state.error = '';
    },
    signupFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { loginSuccess, loginFailure, signupSuccess, signupFailure } = userSlice.actions;

export default userSlice.reducer;
