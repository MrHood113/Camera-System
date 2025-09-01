import type { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useToken } from '../hooks';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading } = useToken();

  if (isLoading) return null; 

  return isAuthenticated ? children : <Navigate to="/stream-cameras" />;
};

export default PrivateRoute;
