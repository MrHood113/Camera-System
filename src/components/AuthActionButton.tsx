import React from 'react';
import { Avatar, Dropdown, message, Spin, } from 'antd';
import { useToken } from '../hooks';
import { useLogout } from '../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { useQueryClient } from '@tanstack/react-query';
import { useUserById } from '../hooks/useUser';
import { getLoggedInMenuItems } from './menu/LoggedInMenu';
import { getLoggedOutMenuItems } from './menu/LoggedOutMenu';

const API_URL = import.meta.env.VITE_API_URL;

const AuthActionButton: React.FC = () => {
  const { isAuthenticated  } = useToken();
  const { mutate: logoutMutate, isPending } = useLogout();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const queryClient = useQueryClient();
  // const userId = useSelector((state: RootState) => state.user.data?.id);
  // const role = useSelector((state: RootState) => state.user.data?.role);

  const location = useLocation();
  const { user: locationUser } = location.state || {};
  const id = localStorage.getItem('id');
  const role = localStorage.getItem('role');
  

  const handleLogout = () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      logoutMutate({ refreshToken });
    } else {
      dispatch(logout());
      localStorage.clear();
      navigate('/login');
    }
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };
  
  const menuItems = isAuthenticated
    ? getLoggedInMenuItems(Number(id) || null, role || null, handleNavigate, handleLogout, queryClient)
    : getLoggedOutMenuItems(handleNavigate);

  const {
    data: User,
    isLoading,
    isError,
  } = useUserById(Number(id), {
    enabled: !locationUser && !!id,
    });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    message.error('User not found. Redirecting...');
    navigate('/profile');
    return null;
  }

  return (
    <div className="w-full !max-w-5xl bg-white rounded-lg"> 
        <Dropdown
          menu={{ items: menuItems }}
          trigger={['hover']}
          overlayClassName="custom-dropdown-menu"
        >
          <div className="cursor-pointer">
            {isPending ? (
              <Spin />
            ) : (
              <Avatar
                size="large"
                src={User?.avatar ? API_URL + User.avatar + '?noAuth' : "https://placehold.co/600x400?text=Hello"}
              />
            )}
          </div>
        </Dropdown>        
    </div>
  );
};

export default AuthActionButton;