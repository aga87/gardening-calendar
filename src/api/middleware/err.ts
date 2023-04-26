import type { Res, ServerError } from '../types';

// Note: it is not a middleware function in a strict/ Express sense but it serves the same purpose
export const errMiddleware = (err: unknown, res: Res<ServerError>) => {
  return res.status(500).send({ error: 'Unexpected server error' });
};
