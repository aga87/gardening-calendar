import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Plant, PlantDetail } from '../../types';

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
  plantDetailUpdateError: null as null | string,
  // Plants in trash
  plantsInTrash: [] as Plant[],
  isLoadingPlantsInTrash: false,
  plantsInTrashError: null as null | string,
  // Move plant to trash
  isLoadingMovePlantToTrash: false,
  movePlantToTrashError: null as string | null,
  // Restore plant
  isLoadingRestorePlant: false,
  restorePlantError: null as null | string
};

export const plantsSlice = createSlice({
  name: 'plants',
  initialState,
  reducers: {
    // GET plants
    setPlants: (state, action: PayloadAction<Plant[]>) => ({
      ...state,
      plants: action.payload
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
    }),
    // GET plants in trash
    setPlantsInTrashLoading: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isLoadingPlantsInTrash: action.payload
    }),
    setPlantsInTrash: (state, action: PayloadAction<Plant[]>) => ({
      ...state,
      plantsInTrash: action.payload
    }),
    setPlantsInTrashError: (state, action: PayloadAction<null | string>) => ({
      ...state,
      plantsInTrashError: action.payload
    }),
    // Move plant to trash
    setMovePlantToTrashLoading: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isLoadingMovePlantToTrash: action.payload
    }),
    setMovePlantToTrash: (state, action: PayloadAction<Plant['_id']>) => ({
      ...state,
      plants: state.plants.filter(plant => plant._id !== action.payload),
      plantDetails: state.plantDetails.filter(
        plant => plant._id !== action.payload
      )
    }),
    setMovePlantToTrashError: (
      state,
      action: PayloadAction<null | string>
    ) => ({
      ...state,
      movePlantToTrashError: action.payload
    }),
    // Restore plant
    setRestorePlantLoading: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isLoadingRestorePlant: action.payload
    }),
    setRestorePlant: (state, action: PayloadAction<Plant>) => ({
      ...state,
      plants: [...state.plants, action.payload],
      plantsInTrash: state.plantsInTrash.filter(
        plant => plant._id !== action.payload._id
      )
    }),
    setRestorePlantError: (state, action: PayloadAction<null | string>) => ({
      ...state,
      restorePlantError: action.payload
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
  setPlantDetailUpdateError,
  // Plants in trash
  setPlantsInTrash,
  setPlantsInTrashLoading,
  setPlantsInTrashError,
  // Move plant to trash
  setMovePlantToTrashLoading,
  setMovePlantToTrash,
  setMovePlantToTrashError,
  // Restore plant
  setRestorePlantLoading,
  setRestorePlant,
  setRestorePlantError
} = plantsSlice.actions;
