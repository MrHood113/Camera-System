import type { StreamCamera } from '../types/camera.type.ts';
import axiosClient from './axiosClient';

const streamCameraApi = {
  getAllStreamCameras: async (): Promise<StreamCamera[]> => {
    const res = await axiosClient.get(`/authenticated/stream-camera`);
    return res.data;
  },
};

export default streamCameraApi;