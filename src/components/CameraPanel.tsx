import React, { useRef, useEffect, useState } from 'react';
import type { CameraPanelProps } from '../types/cameraPanel.type';
import type { JSMpegPlayer } from '../types/jsmpegPlayer.type';
import { useSnapshot } from '../hooks/useSnapShot';

const CameraPanel: React.FC<CameraPanelProps> = ({wsUrl, previewOnly = false, streamUrl, streamType,}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
    const {
    data: snapshotUrl,
    isLoading: snapshotLoading,
    isError: snapshotError,
  } = useSnapshot({ streamUrl: streamUrl ?? '', streamType: streamType! });
  
  // Connect WebSocket to the stream URL and render the video stream
  useEffect(() => {

    if (previewOnly || !wsUrl) return;

    let player: JSMpegPlayer | null = null;
    const script = document.createElement('script');
    script.src = 'https://rawcdn.githack.com/phoboslab/jsmpeg/master/jsmpeg.min.js';

    const timeout = setTimeout(() => {
      setHasError(true);
    }, 10000);

    const createPlayer = () => {
      // @ts-expect-error: JSMpeg is loaded via CDN and is available on window
        player = new window.JSMpeg.Player(wsUrl, {
          canvas: canvasRef.current!,
          autoplay: true,
          audio: false,
          loop: true,
          onVideoDecode: () => {
            setIsPlaying(true);
            clearTimeout(timeout);
            setHasError(false);
          },
        });
    };

    // @ts-expect-error: JSMpeg is loaded via CDN and is available on window
    if (window.JSMpeg) {
      createPlayer();
    } else {
      script.onload = () => {
        createPlayer();
      };

      script.onerror = () => {
        clearTimeout(timeout);
        setHasError(true);
 
        console.error('Failed to load JSMpeg');
      };

      document.body.appendChild(script);

      return () => {
        clearTimeout(timeout);
        if (player) {
          player.destroy();
        }
        document.body.removeChild(script);
      };
    };
  }, [previewOnly, streamUrl, streamType, wsUrl]);

  return (
    <div className="max-w-[600px] w-full cursor-pointer transition-shadow hover:shadow-lg overflow-hidden bg-white border border-gray-300 shadow-sm">
      <div className='aspect-[16/9] bg-black relative flex items-center justify-center'>
      {hasError ? (
        <div className="text-white text-center p-4 ">
            <p className="text-lg font-semibold ">⚠️ Không thể kết nối camera</p>
        </div>
      ) : previewOnly ? (
          snapshotError ? (
            <p className="text-white">⚠️ Snapshot error</p>
          ) : snapshotLoading ? (
            <div className="w-full h-full bg-gray-200 animate-pulse" />
          ) : (
            <img
              src={snapshotUrl!}
              onError={(e) => {
                console.error('[Frontend] Snapshot image failed to load', e);
                e.currentTarget.src = '/ping-placeholder.jpg';
              }}
              alt="Snapshot"
              className="w-full h-full object-cover"
            />
          )
        ) : (
        <>
          <canvas
            ref={canvasRef}
            className="w-full h-full object-contain"
          />

          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
              <span className="text-white text-sm animate-pulse">Đang tải luồng camera...</span>
            </div>
          )}
        </>
      )}
        
      </div>
    </div>
  );
};

export default CameraPanel;
