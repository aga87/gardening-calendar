import { Plant } from '../models/Plant';
import type { PlantsWithCountRes } from '../types';

const select = '-__v -userId';

export const getPlantsWithCount = async (
  userId: string
): Promise<PlantsWithCountRes> => {
  const plants = await Plant.find({ userId }).select(select).sort({ name: 1 });
  return {
    count: plants.length,
    plants
  };
};
