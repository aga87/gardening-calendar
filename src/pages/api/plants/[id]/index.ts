import { connectToDB } from '@/api/libs/db';
import { editPlant, getPlant } from '@/api/services/plant-data.service';
import { validatePlantSchema } from '@/api/models/Plant';
import { authMiddleware, errMiddleware } from '@/api/middleware';
import type { CustomReq, ServerError, Res, PlantRes } from '@/api/types';

type Data = PlantRes;

const handler = async (req: CustomReq, res: Res<Data | ServerError>) => {
  await connectToDB();

  const {
    query: { id },
    method
  } = req;

  if (typeof id !== 'string')
    return res
      .status(400)
      .send({ error: 'The "id" query parameter must be a string.' });

  switch (method) {
    case 'GET':
      try {
        const plant = await getPlant({ plantId: id, userId: req.user });
        if (!plant)
          return res
            .status(404)
            .send({ error: 'Plant with the given ID was not found.' });
        res.status(200).send(plant);
      } catch (err: unknown) {
        errMiddleware(err, res);
      }
      break;
    case 'PATCH':
      const PLANT_IN_TRASH_ERROR_MSG = 'Cannot edit a plant that is in trash.';
      const error = validatePlantSchema(req.body);
      if (error) return res.status(400).send({ error });
      try {
        const plant = await editPlant({
          plantId: id,
          updatedPlant: req.body,
          userId: req.user,
          plantInTrashErrorMsg: PLANT_IN_TRASH_ERROR_MSG
        });
        if (!plant)
          return res
            .status(404)
            .send({ error: 'Plant with the given ID was not found.' });
        return res.status(200).send(plant);
      } catch (err: unknown) {
        if (err instanceof Error && err.message === PLANT_IN_TRASH_ERROR_MSG)
          return res.status(400).send({ error: PLANT_IN_TRASH_ERROR_MSG });
        errMiddleware(err, res);
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PATCH']);
      return res.status(405).send({ error: `Method ${method} Not Allowed` });
  }
};

export default authMiddleware(handler);
