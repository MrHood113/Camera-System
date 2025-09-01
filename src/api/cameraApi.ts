import type { Camera } from '../types/camera.type';
import type { CameraCreateFormValues, CameraUpdateFormValues } from '../validation/cameraSchema';
import axiosClient from './axiosClient';

const cameraApi = {
  getAll: async (): Promise<Camera[]> => {
    const res = await axiosClient.get('/authenticated/cameras')
    return res.data;
  },

  getCameraById: async (id: number): Promise<Camera> => {
    const res = await axiosClient.get(`/authenticated/cameras/${id}`);
    return res.data;
  },

  createCamera: async (data: CameraCreateFormValues): Promise<Camera> => {
    const res = await axiosClient.post('/authenticated/cameras', data);
    return res.data;
  },

  updateCamera: async (id: number, data: CameraUpdateFormValues): Promise<Camera> => {
    const res = await axiosClient.put(`/authenticated/cameras/${id}`, data);
    return res.data;
  },

  deleteCamera: async (id: number): Promise<void> => {
    await axiosClient.delete(`/authenticated/cameras/${id}`);
  },

  searchCameras: async (query: string): Promise<Camera[]> => {
    const res = await axiosClient.get('/authenticated/cameras/search', {
      params: { q: query },
    });
    return res.data;
  },

};

export default cameraApi;
