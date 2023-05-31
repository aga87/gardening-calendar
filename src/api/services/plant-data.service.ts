import { Types } from 'mongoose';
import { Plant } from '../models/Plant';
import type {
  PlantDetailRes,
  PlantRecord,
  PlantRes,
  PlantsWithCountRes
} from '../types';

const select = '-__v -userId -isInTrash';

export const addPlant = async (
  plant: Omit<PlantRecord, '_id' | 'isInTrash'>
): Promise<PlantRes> => {
  const savedPlant: PlantRecord = await new Plant(plant).save();
  const foundPlant: PlantRes = await Plant.findById(savedPlant._id).select(
    select + ' -notes'
  );
  if (!foundPlant) {
    throw new Error('Could not find the saved plant record in the database');
  }
  return foundPlant;
};

export const deletePlantsFromTrash = async ({
  userId
}: {
  userId: string;
}): Promise<number> => {
  const { deletedCount } = await Plant.deleteMany({
    isInTrash: true,
    userId
  });
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
}): Promise<PlantDetailRes | null> => {
  const query = {
    _id: plantId,
    userId
  };
  const plantInDB: PlantRecord | null = await Plant.findOne(query);

  if (plantInDB?.isInTrash) {
    throw new Error(plantInTrashErrorMsg);
  }

  const plant: PlantDetailRes | null = await Plant.findOneAndUpdate(
    query,
    updatedPlant,
    {
      new: true,
      runValidators: true
    }
  ).select(select);

  return plant;
};

export const getPlantDetail = async ({
  plantId,
  userId
}: {
  plantId: Types.ObjectId;
  userId: string;
}): Promise<PlantDetailRes | null> => {
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
    .select(select + ' -notes')
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
