import type { NextApiResponse } from 'next';

export type Res<Data> = NextApiResponse<Data>;

export type ServerError = {
  error: string;
};
