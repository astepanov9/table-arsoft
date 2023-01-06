import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from './base';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  tagTypes: ['Users'],
  baseQuery: baseQuery('users'),
  endpoints: (builder) => ({
    getUsers: builder.query<any, any>({
      query: () => {
        return {
          url: '',
        };
      },
      providesTags: (result) =>
        result
          ? //@ts-ignore
            [...result.map(({ id }) => ({ type: 'Users', id })), { type: 'Users', id: 'LIST' }]
          : [{ type: 'Users', id: 'LIST' }],
    }),
    addUsers: builder.mutation<any, any>({
      query: (body) => {
        return {
          url: '',
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
    editUsers: builder.mutation<any, any>({
      query: (params) => {
        return {
          url: `/${params.id}`,
          method: 'PUT',
          body: { ...params },
        };
      },
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
    deleteUsers: builder.mutation<any, any>({
      query: (id) => {
        return {
          url: `/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddUsersMutation,
  useDeleteUsersMutation,
  useEditUsersMutation,
} = usersApi;
