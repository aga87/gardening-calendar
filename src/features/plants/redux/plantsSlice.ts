import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Plant, PlantsWithCount } from '../types';

const initialState = {
  plants: [] as Plant[],
  plantCount: 0,
  isLoadingPlants: false,
  plantsError: null as null | string
};

export const plantsSlice = createSlice({
  name: 'plants',
  initialState,
  reducers: {
    setPlants: (state, action: PayloadAction<PlantsWithCount>) => ({
      ...state,
      plants: action.payload.plants,
      plantCount: action.payload.count,
      plantsError: null
    }),
    setPlantsLoading: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isLoadingPlants: action.payload
    }),
    setPlantsError: (state, action: PayloadAction<string | null>) => ({
      ...state,
      plantsError: action.payload
    })
  }
});

export default plantsSlice.reducer;

export const { setPlants, setPlantsLoading, setPlantsError } =
  plantsSlice.actions;
