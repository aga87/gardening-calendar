import { Types } from 'mongoose';

export type MonthRecord = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type PlantCategoryRecord = 'vegetables' | 'fruits' | 'herbs' | 'flowers';

// type that represents the data model
export type PlantRecord = {
  _id: Types.ObjectId;
  name: string;
  variety: string | null;
  category: PlantCategoryRecord;
  sowFrom: MonthRecord | null;
  sowUntil: MonthRecord | null;
  harvestFrom: MonthRecord | null;
  harvestUntil: MonthRecord | null;
  isInTrash: boolean;
  userId: string;
};

// type that represents the API response
export type PlantRes = Omit<PlantRecord, 'isInTrash' | 'userId'> & {
  _id: string;
};

export type PlantsWithCountRes = {
  count: number;
  plants: PlantRes[];
};
