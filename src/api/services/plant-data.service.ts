import { Types } from 'mongoose';
import { Plant } from '../models/Plant';
import type { PlantRecord, PlantRes, PlantsWithCountRes } from '../types';

const select = '-__v -userId -isInTrash';

export const addPlant = async (
  plant: Omit<PlantRecord, '_id' | 'isInTrash'>
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

export const deletePlantsFromTrash = async ({
  plantIds,
  userId,
  plantInTrashErrorMsg
}: {
  plantIds: Types.ObjectId[];
  userId: string;
  plantInTrashErrorMsg: string;
}): Promise<number> => {
  const query = {
    _id: { $in: plantIds },
    isInTrash: true,
    userId
  };
  // Check if all the plants to be deleted are in the trash
  const plantsInTrash = await Plant.find(query);
  if (plantsInTrash.length !== plantIds.length) {
    throw Error(plantInTrashErrorMsg);
  }
  // Delete the plants from the database
  const { deletedCount } = await Plant.deleteMany(query);
  return deletedCount;
};

export const editPlant = async ({
  plantId,
  updatedPlant,
  userId,
  plantInTrashErrorMsg
}: {
  plantId: Types.ObjectId;
  updatedPlant: Omit<PlantRes, '_id' | 'isInTrash'>;
  userId: string;
  plantInTrashErrorMsg: string;
}): Promise<PlantRes | null> => {
  const query = {
    _id: plantId,
    userId
  };
  const plantInDB: PlantRecord | null = await Plant.findOne(query);

  if (plantInDB?.isInTrash) {
    throw new Error(plantInTrashErrorMsg);
  }

  const plant: PlantRes | null = await Plant.findOneAndUpdate(
    query,
    updatedPlant,
    {
      new: true,
      runValidators: true
    }
  ).select(select);

  return plant;
};

export const getPlant = async ({
  plantId,
  userId
}: {
  plantId: Types.ObjectId;
  userId: string;
}): Promise<PlantRes | null> => {
  return await Plant.findOne({
    _id: plantId,
    userId
  }).select(select);
};

export const getPlantsWithCount = async ({
  isInTrash,
  userId
}: {
  isInTrash: boolean;
  userId: string;
}): Promise<PlantsWithCountRes> => {
  const plants = await Plant.find({ isInTrash, userId })
    .select(select)
    .sort({ name: 1 });
  return {
    count: plants.length,
    plants
  };
};

export const updatePlantTrashStatus = async ({
  plantId,
  isInTrash,
  userId
}: {
  plantId: Types.ObjectId;
  isInTrash: boolean;
  userId: string;
}): Promise<PlantRes | null> => {
  return await Plant.findOneAndUpdate(
    { _id: plantId, userId },
    { $set: { isInTrash } },
    {
      new: true,
      runValidators: true
    }
  ).select(select);
};
