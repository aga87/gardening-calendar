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

export const getError = (err: unknown) => {
  if (axios.isAxiosError(err) && err.response) return err.response.data.error; // we are returning an error object from the API
  if (err instanceof Error) return err.message;
  return 'Unknown server error';
};
