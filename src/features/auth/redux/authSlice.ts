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
  signUpError: null as null | string,
  isVerificationEmailSent: false
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
    })
  }
});

export default authSlice.reducer;

export const { setUser } = authSlice.actions;
const { setSignUpLoading, setSignUpError, setVerificationEmailSent } =
  authSlice.actions;

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

// Email
export const selectIsVerificationEmailSent = (state: RootState): boolean =>
  state.authReducer.isVerificationEmailSent;
