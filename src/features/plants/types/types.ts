export type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type MonthName =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type PlantCategory = 'vegetables' | 'fruits' | 'herbs' | 'flowers';

export type Plant = {
  _id: string;
  name: string;
  variety: string | null;
  category: PlantCategory;
  sowFrom: Month | null;
  sowUntil: Month | null;
  harvestFrom: Month | null;
  harvestUntil: Month | null;
  userId: string;
};

export type PlantsWithCount = {
  plants: Plant[];
  count: number;
};

export type Sort = 'name' | 'sowing time' | 'harvesting time';
