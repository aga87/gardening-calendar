import { connectToDB } from '@/api/libs/db';
import {
  addPlant,
  deletePlantsFromTrash,
  getPlantsWithCount
} from '@/api/services/plant-data.service';
import { validatePlantSchema } from '@/api/models/Plant';
import { authMiddleware, errMiddleware } from '@/api/middleware';
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

  const { method } = req;

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
          userId: req.user
        });
        return res.status(200).json(plantsWithCount);
      } catch (err: unknown) {
        errMiddleware(err, res);
      }
      break;
    case 'POST':
      const error = validatePlantSchema(req.body);
      if (error) return res.status(400).send({ error });
      try {
        const newPlant = await addPlant({ ...req.body, userId: req.user });
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

      if (typeof id !== 'string')
        return res
          .status(400)
          .send({ error: 'The "id" query parameter must be a string.' });

      const plantIds = id.split(',');

      const PLANT_IN_TRASH_ERROR_MSG =
        'The selected plants cannot be deleted because some of them are not in the trash.';
      try {
        const deletedCount = await deletePlantsFromTrash({
          plantIds,
          userId: req.user,
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
