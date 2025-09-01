// hooks/useLoginMutation.ts
import { useMutation } from '@tanstack/react-query';
import authApi from '../api/authApi';
import { useDispatch } from 'react-redux';
import { loginSuccess, logout } from '../store/slices/authSlice';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { handleApiError } from '../utils/apiErrorHandler';
import userApi from '../api/userApi';
import { clearUser, setUser } from '../store/slices/userSlice';
import type { RoleEnum } from '../types/roleEnum.type';

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: async (data) => {
      
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('role', data.roleEnum);
      localStorage.setItem('id', String(data.id));

      dispatch(loginSuccess({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        roleEnum: data.roleEnum as RoleEnum,  
        id: data.id,
      }));
      
      const user = await userApi.getUserById(data.id);
      dispatch(setUser(user));

      message.success('Login successful!');
      navigate('/stream-cameras');
    },
  });
};

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      dispatch(logout());
      dispatch(clearUser());

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      message.success('Logout successful!');
      navigate('/login');
    },
  });
};

export const useRegister = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: authApi.register,
    onSuccess: () => {
      message.success('Registration successful!');
      navigate('/login');
    },
    onError: (error) => {
      handleApiError(error, 'Registration failed!');
    },
  });
};
