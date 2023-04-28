import { connectToDB } from '@/api/libs/db';
import { getPlantsWithCount } from '@/api/services/plant-data.service';
import { authMiddleware, errMiddleware } from '@/api/middleware';
import type {
  CustomReq,
  PlantsWithCountRes,
  PlantRes,
  Res,
  ServerError
} from '@/api/types';

type Data = PlantsWithCountRes | PlantRes;

const handler = async (req: CustomReq, res: Res<Data | ServerError>) => {
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
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).send({ error: `Method ${method} Not Allowed` });
  }
};

export default authMiddleware(handler);
