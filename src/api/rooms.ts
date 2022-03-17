import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API } from '../env';
import { Room } from '../types/types';

export const roomsApi = createApi({
  reducerPath: 'roomsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API }),
  endpoints: (builder) => ({
    allRooms: builder.query<Room[], void>({
      query: () => 'rooms',
    }),
  }),
});

export const { useAllRoomsQuery, useLazyAllRoomsQuery, usePrefetch } = roomsApi;
