import { Types } from 'mongoose';

export const toObjectId = (id: unknown): Types.ObjectId | undefined => {
  if (typeof id === 'string' && Types.ObjectId.isValid(id))
    return new Types.ObjectId(id);

  return undefined;
};
