import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { REST_API } from '../env';
import { User } from '../types/common';

export const usersApi = createApi({
  reducerPath: 'usesApi',
  baseQuery: fetchBaseQuery({ baseUrl: REST_API }),
  endpoints: (builder) => ({
    allUsers: builder.query<User[], void>({
      query: () => 'users',
    }),
  }),
});

export const { useAllUsersQuery, useLazyAllUsersQuery, usePrefetch } = usersApi;
