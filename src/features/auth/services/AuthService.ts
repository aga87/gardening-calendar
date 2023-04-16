import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from '@/firebase';
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
  }
};

// Firebase Auth reference: https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth
