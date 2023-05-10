import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Plant, PlantsWithCount } from '../../types';

const initialState = {
  plants: [] as Plant[],
  isLoadingPlants: false,
  plantsError: null as null | string,
  isLoadingNewPlant: false,
  newPlantError: null as null | string[]
};

export const plantsSlice = createSlice({
  name: 'plants',
  initialState,
  reducers: {
    // GET plants
    setPlants: (state, action: PayloadAction<PlantsWithCount>) => ({
      ...state,
      plants: action.payload.plants,
      plantsError: null
    }),
    setPlantsLoading: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isLoadingPlants: action.payload
    }),
    setPlantsError: (state, action: PayloadAction<string | null>) => ({
      ...state,
      plantsError: action.payload
    }),
    // POST plant
    setNewPlant: (state, action: PayloadAction<Plant>) => ({
      ...state,
      plants: [...state.plants, action.payload]
    }),
    setNewPlantLoading: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isLoadingNewPlant: action.payload
    }),
    setNewPlantError: (state, action: PayloadAction<string[] | null>) => ({
      ...state,
      newPlantError: action.payload
    })
  }
});

export default plantsSlice.reducer;

export const {
  setPlants,
  setPlantsLoading,
  setPlantsError,
  setNewPlant,
  setNewPlantLoading,
  setNewPlantError
} = plantsSlice.actions;
