import axios, { AxiosInstance } from 'axios';

type Headers = {
  [key: string]: string;
};

export const createApiInstance = (
  baseURL: string,
  headers: Headers
): AxiosInstance => {
  return axios.create({
    baseURL,
    headers
  });
};
