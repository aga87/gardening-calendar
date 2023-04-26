import type { NextApiRequest } from 'next';
import { connectToDB } from '@/api/libs/db';
import { getPlantsWithCount } from '@/api/services/plant-data.service';
import { errMiddleware } from '@/api/middleware';
import type {
  PlantsWithCountRes,
  PlantRes,
  Res,
  ServerError
} from '@/api/types';

type Data = PlantsWithCountRes | PlantRes;

export default async function handler(
  req: NextApiRequest,
  res: Res<Data | ServerError>
) {
  await connectToDB();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const plantsWithCount = await getPlantsWithCount(req.user);
        return res.status(200).json(plantsWithCount);
      } catch (err: unknown) {
        errMiddleware(err, res);
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      return res.status(405).send({ error: `Method ${method} Not Allowed` });
  }
}
