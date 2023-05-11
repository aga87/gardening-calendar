import { Types } from 'mongoose';
import { connectToDB } from '@/api/libs/db';
import {
  addPlant,
  deletePlantsFromTrash,
  getPlantsWithCount
} from '@/api/services/plant-data.service';
import { validatePlantSchema } from '@/api/models/Plant';
import { authMiddleware, errMiddleware } from '@/api/middleware';
import { isValidObjectId } from '@/api/utils';
import type {
  CustomReq,
  PlantsWithCountRes,
  PlantRes,
  Res,
  ServerError
} from '@/api/types';

type Data = PlantsWithCountRes | PlantRes | { message: string };

const handler = async (req: CustomReq, res: Res<Data | ServerError>) => {
  await connectToDB();

  const { method, userId } = req;

  switch (method) {
    case 'GET':
      const {
        query: { isInTrash }
      } = req;
      if (isInTrash !== 'true' && isInTrash !== 'false')
        return res.status(400).send({
          error:
            'The "isInTrash" query parameter must be either "true" or "false".'
        });
      try {
        const plantsWithCount = await getPlantsWithCount({
          isInTrash: isInTrash === 'true' ? true : false,
          userId
        });
        return res.status(200).json(plantsWithCount);
      } catch (err: unknown) {
        errMiddleware(err, res);
      }
      break;
    case 'POST':
      const error = validatePlantSchema({ plant: req.body, isEditing: false });
      if (error) return res.status(400).send({ error });
      try {
        const newPlant = await addPlant({ ...req.body, userId });
        res.setHeader(
          'location',
          `${req.headers.host}/api/plants/${newPlant._id}`
        );
        return res.status(201).send(newPlant);
      } catch (err: unknown) {
        errMiddleware(err, res);
      }
      break;
    case 'DELETE':
      const {
        query: { id }
      } = req;

      if (!id)
        return res.status(400).send({
          error: 'Plant IDs are missing. Please provide at least one ID'
        });

      const ids = Array.isArray(id) ? id : [id];

      const invalidIds = ids.filter(id => !isValidObjectId(id));

      if (invalidIds.length > 0) {
        return res.status(404).send({
          error: `Plants with following ids were not found: ${invalidIds.join(
            ', '
          )}`
        });
      }

      const plantIds = ids.map(id => new Types.ObjectId(id));

      const PLANT_IN_TRASH_ERROR_MSG =
        'The selected plants cannot be deleted because some of them are not in the trash.';
      try {
        const deletedCount = await deletePlantsFromTrash({
          plantIds,
          userId,
          plantInTrashErrorMsg: PLANT_IN_TRASH_ERROR_MSG
        });
        return res
          .status(200)
          .send({ message: `${deletedCount} plants have been deleted.` });
      } catch (err: unknown) {
        if (err instanceof Error && err.message === PLANT_IN_TRASH_ERROR_MSG)
          return res.status(400).send({ error: err.message });
        errMiddleware(err, res);
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      return res.status(405).send({ error: `Method ${method} Not Allowed` });
  }
};

export default authMiddleware(handler);
