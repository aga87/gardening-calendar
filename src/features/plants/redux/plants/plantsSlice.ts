import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Plant, PlantDetail, PlantsWithCount } from '../../types';

const initialState = {
  // Plants
  plants: [] as Plant[],
  isLoadingPlants: false,
  plantsError: null as null | string,
  // New plant
  isLoadingNewPlant: false,
  newPlantError: null as null | string[],
  // Plant details
  plantDetails: [] as PlantDetail[],
  isLoadingPlantDetail: false,
  plantDetailError: null as null | string,
  // Update plant detail
  isLoadingPlantDetailUpdate: false,
  plantDetailUpdateError: null as null | string
};

export const plantsSlice = createSlice({
  name: 'plants',
  initialState,
  reducers: {
    // GET plants
    setPlants: (state, action: PayloadAction<PlantsWithCount>) => ({
      ...state,
      plants: action.payload.plants
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
    }),
    // GET plant detail
    setPlantDetail: (state, action: PayloadAction<PlantDetail>) => ({
      ...state,
      plantDetails: [...state.plantDetails, action.payload]
    }),
    setPlantDetailLoading: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isLoadingPlantDetail: action.payload
    }),
    setPlantDetailError: (state, action: PayloadAction<string | null>) => ({
      ...state,
      plantDetailError: action.payload
    }),
    // PATCH plant detail
    setPlantDetailUpdate: (state, action: PayloadAction<PlantDetail>) => {
      const updatedPlantDetails = state.plantDetails.map(plant => {
        if (plant._id === action.payload._id) return action.payload;
        return plant;
      });

      const updatedPlants = state.plants.map(plant => {
        if (plant._id === action.payload._id) {
          const { notes, ...updatedPlant } = action.payload;
          return updatedPlant; // return the updated object without the "notes" property
        }
        return plant;
      });

      return {
        ...state,
        plantDetails: updatedPlantDetails,
        plants: updatedPlants
      };
    },
    setPlantDetailUpdateLoading: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isLoadingPlantDetailUpdate: action.payload
    }),
    setPlantDetailUpdateError: (
      state,
      action: PayloadAction<string | null>
    ) => ({
      ...state,
      plantDetailUpdateError: action.payload
    })
  }
});

export default plantsSlice.reducer;

export const {
  // Plants
  setPlants,
  setPlantsLoading,
  setPlantsError,
  // New plant
  setNewPlant,
  setNewPlantLoading,
  setNewPlantError,
  // Plant detail
  setPlantDetail,
  setPlantDetailLoading,
  setPlantDetailError,
  // New plant detail
  setPlantDetailUpdate,
  setPlantDetailUpdateLoading,
  setPlantDetailUpdateError
} = plantsSlice.actions;
