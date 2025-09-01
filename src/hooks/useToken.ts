// import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const useToken = () => {
  // const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  

  // Check if user is authenticated on initial load
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, []);

  const getToken = () => localStorage.getItem('accessToken');

  return { getToken, isAuthenticated, isLoading };
};

export default useToken;