import { connectToDB } from '@/api/libs/db';
import { editPlant, getPlant } from '@/api/services/plant-data.service';
import { validatePlantSchema } from '@/api/models/Plant';
import { authMiddleware, errMiddleware } from '@/api/middleware';
import { toObjectId } from '@/api/utils';
import type { CustomReq, ServerError, Res, PlantRes } from '@/api/types';

type Data = PlantRes;

const handler = async (req: CustomReq, res: Res<Data | ServerError>) => {
  await connectToDB();

  const {
    query: { id },
    method,
    userId
  } = req;

  const plantId = toObjectId(id);

  if (!plantId) {
    // 404 is valid response from the user perspective even if 400 is more accurate: 'The "id" query parameter is not a valid ObjectId.'
    return res
      .status(404)
      .send({ error: 'Plant with the given ID was not found.' });
  }

  switch (method) {
    case 'GET':
      try {
        const plant = await getPlant({
          plantId,
          userId
        });
        if (!plant)
          return res
            .status(404)
            .send({ error: 'Plant with the given ID was not found.' });
        return res.status(200).send(plant);
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
          plantId,
          updatedPlant: req.body,
          userId,
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
