import { useQuery } from '@tanstack/react-query';
import type { StreamCamera } from '../types/camera.type.ts';
import streamCameraApi from '../api/streamApi';

export const useStreamCameras = () => {
  return useQuery<StreamCamera[]>({
    queryKey: ['stream-cameras'],
    queryFn: () => streamCameraApi.getAllStreamCameras(),
  });
};

