import { connectToDB } from '@/api/libs/db';
import { updatePlantTrashStatus } from '@/api/services/plant-data.service';
import { validatePlantStatusSchema } from '@/api/models/Plant';
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
    case 'PUT':
      const error = validatePlantStatusSchema(req.body);
      if (error) return res.status(400).send({ error });
      try {
        const plant = await updatePlantTrashStatus({
          plantId: id,
          isInTrash: req.body.isInTrash,
          userId: req.user
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
