import { createApiInstance, getError } from '@/libs/axios';
import { getAuthToken } from '@/features/auth';
import type { NewPlant, Plant, PlantDetail, PlantsWithCount } from '../types';

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
  getPlants: async () => {
    try {
      const apiInstance = await getApiInstance();
      const res = await apiInstance.get('/api/plants?isInTrash=false');
      const plantsWithCount: PlantsWithCount = res.data;
      return { plantsWithCount, error: null };
    } catch (err: unknown) {
      return { plantsWithCount: null, error: getError(err) };
    }
  }
};
