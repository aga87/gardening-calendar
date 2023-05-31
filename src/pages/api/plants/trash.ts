import { connectToDB } from '@/api/libs/db';
import { deletePlantsFromTrash } from '@/api/services/plant-data.service';
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

  const { method, userId } = req;

  switch (method) {
    case 'DELETE':
      try {
        const deletedCount = await deletePlantsFromTrash({
          userId
        });
        return res
          .status(200)
          .send({ message: `${deletedCount} plants have been deleted.` });
      } catch (err: unknown) {
        errMiddleware(err, res);
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      return res.status(405).send({ error: `Method ${method} Not Allowed` });
  }
};

export default authMiddleware(handler);
