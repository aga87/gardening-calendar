import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from '@/libs/firebase';
import { getErrorMessage } from '@/utils';

export const AuthService = {
  subscribeToAuthStateChanges: (
    callback: (user: FirebaseUser | null) => void
  ) => onAuthStateChanged(auth, callback), // https://firebase.google.com/docs/auth/web/manage-users#get_the_currently_signed-in_user

  signUp: async ({ email, password }: { email: string; password: string }) => {
    try {
      // Create user with email and password: https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#createuserwithemailandpassword
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;

      // Send verification email: // https://firebase.google.com/docs/auth/web/manage-users#send_a_user_a_verification_email
      await sendEmailVerification(user);

      return { isVerificationEmailSent: true, error: null };
    } catch (err: unknown) {
      return { isVerificationEmailSent: false, error: getErrorMessage(err) };
    }
  },

  resendVerificationEmail: async () => {
    try {
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
        return { isVerificationEmailSent: true, error: null };
      } else {
        throw new Error('User does not exist');
      }
    } catch (err: unknown) {
      return { isVerificationEmailSent: false, error: getErrorMessage(err) };
    }
  },

  signIn: async ({ email, password }: { email: string; password: string }) => {
    try {
      await signOut(auth); // Workaround: signing out first so that Firebase updates emailVerified property
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;

      if (!user.emailVerified) {
        throw new Error(
          'Please verify your email address. Check your inbox (including your spam folder) for a verification email or request a new one.'
        );
      }
      return { error: null };
    } catch (err: unknown) {
      return { error: getErrorMessage(err) };
    }
  },

  signInWithGoogle: async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider); // (You can access the user's Google account data with `result.additionalUserInfo.profile`).
      return { error: null };
    } catch (err: unknown) {
      return { error: getErrorMessage(err) };
    }
  },

  signInWithGitHub: async () => {
    const provider = new GithubAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      return { error: null };
    } catch (err: unknown) {
      return { error: getErrorMessage(err) };
    }
  },

  signOut: async () => {
    try {
      await signOut(auth);
      return { error: null };
    } catch (err: unknown) {
      return { error: getErrorMessage(err) };
    }
  }
};

// Firebase Auth reference: https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth
