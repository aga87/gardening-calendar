import * as admin from 'firebase-admin';
import type { ServiceAccount } from 'firebase-admin';
import serviceAccount from './firebaseAdminServiceAccountKey.json';

const firebaseAdmin = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as ServiceAccount)
    })
  : admin.app();

if (!firebaseAdmin) {
  throw new Error('FirebaseAdmin has not been initialized');
}

export const adminAuth = firebaseAdmin.auth();
