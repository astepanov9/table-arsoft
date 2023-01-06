import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const baseQuery = (baseUrl: any) =>
  fetchBaseQuery({
    baseUrl: `https://638a89507220b45d227e9261.mockapi.io/${baseUrl}`,
  });
