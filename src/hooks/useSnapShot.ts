import { useQuery } from '@tanstack/react-query';
import type { SnapshotParams } from '../types/cameraPanel.type';

export function useSnapshot({ streamUrl, streamType }: SnapshotParams) {
  return useQuery({
    queryKey: ['snapshot', streamUrl, streamType],
    queryFn: async () => {
      if (!streamUrl || !streamType) throw new Error('Missing snapshot info');

      const params = new URLSearchParams({url: streamUrl, type: streamType });
      const res = await fetch(`http://localhost:4000/api/snapshot?${params.toString()}`);
      console.log(`[Frontend] Snapshot fetch status: ${res.status}`);

      if (!res.ok) {
        const text = await res.text();
        console.error('[Frontend] Snapshot error response:', text);
        throw new Error(`Snapshot failed: ${res.status}`);
        }

      const blob = await res.blob();
      console.log('[Frontend] Received blob of type:', blob.type);

      if (!blob.type.startsWith('image/')) {
        throw new Error('Không phải ảnh hợp lệ: ' + blob.type);
}
      return URL.createObjectURL(blob);
    },
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60,
    enabled: !!streamUrl && !!streamType,
  });
}
