import { adminAuth } from '@/api/libs/firebase-admin';
import type { CustomHandler, CustomReq, Res, ServerError } from '../types';

export const authMiddleware =
  (handler: CustomHandler) => async (req: CustomReq, res: Res<ServerError>) => {
    const token = req.headers?.authorization?.split('Bearer ')[1];

    if (!token)
      return res.status(401).send({ error: 'Access token is missing.' });

    try {
      const decodedToken = await adminAuth.verifyIdToken(token); // https://firebase.google.com/docs/auth/admin/verify-id-tokens#web
      req.userId = decodedToken.uid;

      return handler(req, res);
    } catch (err) {
      return res.status(401).json({ error: 'Invalid access token.' });
    }
  };
