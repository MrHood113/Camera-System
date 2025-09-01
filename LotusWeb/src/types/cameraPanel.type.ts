export interface CameraPanelProps {
  wsUrl: string;
  previewOnly?: boolean;
  streamUrl?: string;
  streamType?: 'PING' | 'RTSP' | 'HTTP' | null;
}

export type SnapshotParams = Pick<CameraPanelProps, 'streamUrl' | 'streamType'>;
