import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { User } from '../types/user.type';
import type { UserUpdateFormValues } from '../validation/userSchema';
import userApi from '../api/userApi';

export const useUsers = () =>
  useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => 
         userApi.getAll(),
  });

export const useUserById = (id: number, options?: {
    enabled?: boolean;
    options?: { enabled?: boolean }
  }) =>
  useQuery<User>({
    queryKey: ['user', id],
    queryFn: () => {
      if (id === undefined) {
        throw new Error('User ID is undefined');
      }
      return userApi.getUserById(id);
    },
    enabled: (id !== undefined && !Number.isNaN(id)) && (options?.enabled ?? true),
  });

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: UserUpdateFormValues }) => 
        userApi.updateUser(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['user', id] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userApi.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

// export const useSearchUsers = (query: string) =>
//   useQuery<User[]>({
//     queryKey: ['searchUsers', query],
//     queryFn: () => userApi.searchUsers(query),
//     enabled: !!query,
// });
