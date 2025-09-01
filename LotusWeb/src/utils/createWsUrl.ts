export const createWsUrl = (cameraId: number): string => {
  const token = localStorage.getItem('accessToken');
  return `ws://localhost:4000/?cameraId=${cameraId}&token=${token}`;
};