import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { REST_API } from '../env';
import { Room } from '../types/common';

export const roomsApi = createApi({
  reducerPath: 'roomsApi',
  baseQuery: fetchBaseQuery({ baseUrl: REST_API }),
  endpoints: (builder) => ({
    allRooms: builder.query<Room[], void>({
      query: () => 'rooms',
    }),
  }),
});

export const { useAllRoomsQuery, useLazyAllRoomsQuery, usePrefetch } = roomsApi;
