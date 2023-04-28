import { connectToDB } from '@/api/libs/db';
import { getPlant } from '@/api/services/plant-data.service';
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
            .status(400)
            .send({ error: 'Plant with the given ID was not found.' });
        res.status(200).send(plant);
      } catch (err: unknown) {
        errMiddleware(err, res);
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      return res.status(405).send({ error: `Method ${method} Not Allowed` });
  }
};

export default authMiddleware(handler);
