import { createApiInstance, getError } from '@/libs/axios';
import { getAuthToken } from '@/features/auth';
import type { NewPlant, Plant, PlantsWithCount } from '../types';

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
  getPlants: async () => {
    try {
      const apiInstance = await getApiInstance();
      const res = await apiInstance.get('/api/plants?isInTrash=false');
      const plantsWithCount: PlantsWithCount = res.data;
      return { plantsWithCount, error: null };
    } catch (err: unknown) {
      return { plantsWithCount: null, error: getError(err) };
    }
  },
  addPlant: async (newPlant: NewPlant) => {
    try {
      const apiInstance = await getApiInstance();
      const res = await apiInstance.post('/api/plants', newPlant);
      const plant: Plant = res.data;
      return { plant, error: null };
    } catch (err: unknown) {
      return { plant: null, error: getError(err) };
    }
  }
};
