import { Types } from 'mongoose';

export const isValidObjectId = (id: unknown) =>
  typeof id === 'string' && Types.ObjectId.isValid(id);
