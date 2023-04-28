import type { NextApiRequest, NextApiResponse } from 'next';

export interface CustomReq extends NextApiRequest {
  user: string;
}

export type Res<Data> = NextApiResponse<Data>;

export type CustomHandler<T = any> = (
  req: CustomReq,
  res: NextApiResponse<T>
) => unknown | Promise<unknown>;

export type ServerError = {
  error: string;
};
