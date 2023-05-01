import { RootState } from '@/redux/store';

// User
export const selectUserEmail = (state: RootState): string =>
  state.authReducer.user?.userEmail || '';

export const selectIsUserVerified = (state: RootState): boolean =>
  state.authReducer.user?.emailVerified || false;

export const selectIsCurrentUserLoading = (state: RootState): boolean =>
  state.authReducer.isLoadingCurrentUser;

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
