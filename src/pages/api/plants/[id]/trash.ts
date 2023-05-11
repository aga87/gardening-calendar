import { connectToDB } from '@/api/libs/db';
import { updatePlantTrashStatus } from '@/api/services/plant-data.service';
import { validatePlantStatusSchema } from '@/api/models/Plant';
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

  const plantId = toObjectId(id); // convert to ObjectId type

  if (!plantId) {
    // 404 is valid response from the user perspective even if 400 is more accurate: 'The "id" query parameter is not a valid ObjectId.'
    return res
      .status(404)
      .send({ error: 'Plant with the given ID was not found.' });
  }

  switch (method) {
    case 'PUT':
      const error = validatePlantStatusSchema(req.body);
      if (error) return res.status(400).send({ error });
      try {
        const plant = await updatePlantTrashStatus({
          plantId,
          isInTrash: req.body.isInTrash,
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
    default:
      res.setHeader('Allow', ['PUT']);
      return res.status(405).send({ error: `Method ${method} Not Allowed` });
  }
};

export default authMiddleware(handler);
