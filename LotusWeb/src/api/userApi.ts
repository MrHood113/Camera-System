
import type { User } from '../types/user.type';
import type { UserUpdateFormValues } from '../validation/userSchema';
import axiosClient from './axiosClient';

const userApi = {
  getAll: async (): Promise<User[]> => {
    const res = await axiosClient.get('/users')
    return res.data;
  },

  getUserById: async (id: number): Promise<User> => {
    const res = await axiosClient.get(`/users/${id}`);
    return res.data;
  },

  updateUser: async (id: number, data: UserUpdateFormValues): Promise<User> => {
    const res = await axiosClient.put(`/users/${id}`, data);
    return res.data;
  },

  deleteUser: async (id: number): Promise<void> => {
    await axiosClient.delete(`users/${id}`);
  },

//   searchUsers: async (query: string): Promise<User[]> => {
//     const res = await axiosClient.get('/authenticated/cameras/search', {
//       params: { q: query },
//     });
//     return res.data;
//   },

};

export default userApi;
