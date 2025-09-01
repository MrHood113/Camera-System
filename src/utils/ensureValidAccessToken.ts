import { refreshAccessToken } from "../services/tokenService";

export const ensureValidAccessToken = async () => {
  try {
    await refreshAccessToken();
  } catch (err) {
    console.error('Refresh failed: ', err);
    throw err;
  }
};