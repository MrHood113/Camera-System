import type { LoginRequest, LoginResponse } from '../types/login.type';
import type { LogoutRequest, LogoutResponse } from '../types/logout.type';
import type { RefreshRequest, RefreshResponse } from '../types/refresh.type';
import type { RegisterRequest, RegisterResponse } from '../types/register.type';
import axiosClient from './axiosClient';
import axiosNoAuth from './axiosNoAuth';

const authApi = {
    login: async (data: LoginRequest): Promise<LoginResponse> => {
        const res = await axiosNoAuth.post('/auth/login', data);
        return res.data;
    },

    register: async (data: RegisterRequest): Promise<RegisterResponse> => {
        const res = await axiosNoAuth.post('/auth/register', data);
        return res.data;
    },

    refresh: async (data: RefreshRequest): Promise<RefreshResponse> => {
      const res = await axiosNoAuth.post('auth/tokens/refresh', data);
      return res.data;
    },

    logout: async (data: LogoutRequest): Promise<LogoutResponse> => {
      const res = await axiosClient.post('/auth/logout', data);
      return res.data;
    }
};


export default authApi;
