import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API } from '../env';
import { User } from '../types/types';

export const usersApi = createApi({
  reducerPath: 'usesApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API }),
  endpoints: (builder) => ({
    allUsers: builder.query<User[], void>({
      query: () => 'users',
    }),
  }),
});

export const { useAllUsersQuery, useLazyAllUsersQuery, usePrefetch } = usersApi;