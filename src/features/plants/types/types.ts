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
};

export type NewPlant = Omit<Plant, '_id'>;

export type PlantDetail = Plant & { notes: string | null };

export type NewPlantDetail = Omit<PlantDetail, '_id'>;

export type Sort = 'name' | 'sowing time' | 'harvesting time';
