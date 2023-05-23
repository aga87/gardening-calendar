import { createApiInstance, getError } from '@/libs/axios';
import { getAuthToken } from '@/features/auth';
import type { NewPlant, NewPlantDetail, Plant, PlantDetail } from '../types';

const getApiInstance = async () => {
  const { authToken } = await getAuthToken();
  const baseURL = ''; // Not needed with Next.js
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken}`
  };
  return createApiInstance(baseURL, headers);
};

export const PlantsApiService = {
  addPlant: async (newPlant: NewPlant) => {
    try {
      const apiInstance = await getApiInstance();
      const res = await apiInstance.post('/api/plants', newPlant);
      const plant: Plant = res.data;
      return { plant, error: null };
    } catch (err: unknown) {
      return { plant: null, error: getError(err) };
    }
  },
  getPlants: async ({ inTrash }: { inTrash: boolean }) => {
    try {
      const apiInstance = await getApiInstance();
      const res = await apiInstance.get(`/api/plants?isInTrash=${inTrash}`);
      const plants: Plant[] = res.data.plants;
      return { plants, error: null };
    } catch (err: unknown) {
      return { plants: null, error: getError(err) };
    }
  },
  getPlantDetail: async (id: Plant['_id']) => {
    try {
      const apiInstance = await getApiInstance();
      const res = await apiInstance.get(`/api/plants/${id}`);
      const plantDetail: PlantDetail | null = res.data;
      return { plantDetail, error: null };
    } catch (err: unknown) {
      return { plantDetail: null, error: getError(err) };
    }
  },
  editPlantDetail: async ({
    newPlantDetail,
    plantId
  }: {
    newPlantDetail: NewPlantDetail;
    plantId: Plant['_id'];
  }) => {
    try {
      const apiInstance = await getApiInstance();
      const res = await apiInstance.patch(
        `/api/plants/${plantId}`,
        newPlantDetail
      );
      const updatedPlantDetail: PlantDetail | null = res.data;
      return {
        updatedPlantDetail,
        error: null
      };
    } catch (err: unknown) {
      return { updatedPlantDetail: null, error: getError(err) };
    }
  }
};
