import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Camera } from '../types/camera.type';
import type { CameraUpdateFormValues } from '../validation/cameraSchema';
import cameraApi from '../api/cameraApi';

export const useCameras = () =>
  useQuery<Camera[]>({
    queryKey: ['cameras'],
    queryFn: async () => 
         cameraApi.getAll(),
  });

export const useCameraById = (id: number, options?: {
    enabled?: boolean;
  }) =>
  useQuery<Camera>({
    queryKey: ['camera', id],
    queryFn: () => cameraApi.getCameraById(id),
    enabled: options?.enabled ?? true,
  });

export const useCreateCamera = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cameraApi.createCamera,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cameras'] });
    },
  });
};

export const useUpdateCamera = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: CameraUpdateFormValues }) => 
        cameraApi.updateCamera(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['camera', id] });
      queryClient.invalidateQueries({ queryKey: ['cameras'] });
    },
  });
};

export const useDeleteCamera = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cameraApi.deleteCamera,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cameras'] });
    },
  });
};

export const useSearchCameras = (query: string) =>
  useQuery<Camera[]>({
    queryKey: ['searchCameras', query],
    queryFn: () => cameraApi.searchCameras(query),
    enabled: !!query,
});
