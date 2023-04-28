import { Plant } from '../models/Plant';
import type { PlantRecord, PlantRes, PlantsWithCountRes } from '../types';

const select = '-__v -userId';

export const addPlant = async (
  plant: Omit<PlantRecord, '_id'>
): Promise<PlantRes> => {
  const savedPlant: PlantRecord = await new Plant(plant).save();
  const foundPlant: PlantRes = await Plant.findById(savedPlant._id).select(
    select
  );
  if (!foundPlant) {
    throw new Error('Could not find the saved plant record in the database');
  }
  return foundPlant;
};

export const getPlantsWithCount = async (
  userId: string
): Promise<PlantsWithCountRes> => {
  const plants = await Plant.find({ userId }).select(select).sort({ name: 1 });
  return {
    count: plants.length,
    plants
  };
};
