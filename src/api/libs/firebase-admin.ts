import * as admin from 'firebase-admin';
import type { ServiceAccount } from 'firebase-admin';

const serviceAccount = process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT;

if (!serviceAccount) {
  throw Error('Firebase service account key is missing');
}

const firebaseAdmin = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(
        JSON.parse(serviceAccount) as ServiceAccount
      )
    })
  : admin.app();

if (!firebaseAdmin) {
  throw new Error('FirebaseAdmin has not been initialized');
}

export const adminAuth = firebaseAdmin.auth();
