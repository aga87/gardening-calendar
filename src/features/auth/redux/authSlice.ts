import {
  AnyAction,
  createSlice,
  PayloadAction,
  ThunkDispatch
} from '@reduxjs/toolkit';
import { AppThunk, RootState } from '@/redux/store';
import { AuthService } from '../services/AuthService';

type User = { userEmail: string; emailVerified: boolean };

const initialState = {
  user: null as null | User,
  isLoadingSignUp: false,
  isLoadingSignIn: false,
  signInError: null as null | string,
  signUpError: null as null | string,
  isVerificationEmailSent: false,
  verificationEmailError: null as null | string
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => ({
      ...state,
      user: action.payload
    }),
    // Sign up
    setSignUpLoading: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isLoadingSignUp: action.payload
    }),
    setSignUpError: (state, action: PayloadAction<string | null>) => ({
      ...state,
      signUpError: action.payload
    }),
    setVerificationEmailSent: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isVerificationEmailSent: action.payload
    }),
    // Sign in
    setSignInLoading: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isLoadingSignIn: action.payload
    }),
    setSignInError: (state, action: PayloadAction<string | null>) => ({
      ...state,
      signInError: action.payload
    }),
    setVerificationEmailError: (
      state,
      action: PayloadAction<string | null>
    ) => ({
      ...state,
      verificationEmailError: action.payload
    })
  }
});

export default authSlice.reducer;

export const { setUser } = authSlice.actions;
const {
  setSignUpLoading,
  setSignInLoading,
  setSignUpError,
  setSignInError,
  setVerificationEmailSent,
  setVerificationEmailError
} = authSlice.actions;

export const subscribeToAuthStateChanges =
  () => (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
    const unsubscribe = AuthService.subscribeToAuthStateChanges(user => {
      dispatch(
        setUser(
          user
            ? {
                userEmail: user.email ?? '',
                emailVerified: user.emailVerified
              }
            : null
        )
      );
    });

    return unsubscribe;
  };

export const signUp =
  ({ email, password }: { email: string; password: string }): AppThunk =>
  async dispatch => {
    dispatch(setSignUpLoading(true));
    const { isVerificationEmailSent, error } = await AuthService.signUp({
      email,
      password
    });
    dispatch(setVerificationEmailSent(isVerificationEmailSent));
    dispatch(setSignUpError(error));
    dispatch(setSignUpLoading(false));
  };

export const resendVerificationEmail = (): AppThunk => async dispatch => {
  const { isVerificationEmailSent, error } =
    await AuthService.resendVerificationEmail();
  dispatch(setVerificationEmailSent(isVerificationEmailSent));
  dispatch(setVerificationEmailError(error));
};

export const signIn =
  ({ email, password }: { email: string; password: string }): AppThunk =>
  async dispatch => {
    dispatch(setSignInLoading(true));
    const { error } = await AuthService.signIn({ email, password });
    dispatch(setSignInError(error));
    dispatch(setSignInLoading(false));
  };

// SELECTORS
// User
export const selectUserEmail = (state: RootState): string =>
  state.authReducer.user?.userEmail || '';

export const selectIsUserVerified = (state: RootState): boolean =>
  state.authReducer.user?.emailVerified || false;

// Sign up
export const selectIsLoadingSignUp = (state: RootState): boolean =>
  state.authReducer.isLoadingSignUp;

export const selectSignUpError = (state: RootState): string | null =>
  state.authReducer.signUpError;

// Sign in
export const selectIsLoadingSignIn = (state: RootState): boolean =>
  state.authReducer.isLoadingSignIn;

export const selectSignInError = (state: RootState): string | null =>
  state.authReducer.signInError;

export const selectIsVerificationEmailSent = (state: RootState): boolean =>
  state.authReducer.isVerificationEmailSent;
