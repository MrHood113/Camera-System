import authApi from "../api/authApi";

export const refreshAccessToken = async (): Promise<string> => {
  
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) throw new Error("No refresh token");

  const res = await authApi.refresh({ refreshToken });
  const newAccessToken = res.accessToken;

  localStorage.setItem('accessToken', newAccessToken);
  return newAccessToken;
};
