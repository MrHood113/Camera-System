import { Card, Descriptions } from 'antd';
import { useLocation, useParams } from 'react-router-dom';
import { CameraPanel, MapPicker } from '../components';
import { useCameraById } from '../hooks';
import { createWsUrl } from '../utils/createWsUrl';

const StreamCameraDetail: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const { camera: locationCamera } = location.state || {};

  const { 
    data: camera, 
    isLoading, 
    error } = useCameraById(Number(id), {
    enabled: !locationCamera && !!id,
  });

  if (isLoading) return <div className="text-center mt-10">Loading camera...</div>;
  if (error || !camera) return <div className="text-center mt-10 text-red-500">Error loading camera</div>;

  return (
    <div className="p-6 flex flex-col gap-6">
      <div className='w-full mt-20'>
            <div className="w-full flex justify-center items-center min-h-[400px]">
                <CameraPanel wsUrl={createWsUrl(camera.id)} />
            </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 z-10">
        <div className="rounded-2xl h-full min-h-[10px]" title="Google Map">
          <MapPicker 
            defaultLatLng={{ lat: camera.latitude, lng: camera.longitude }}
            onLocationSelected={(lat, lng, timeZone) => {
              console.log({ lat, lng, timeZone });
            }} 
          />
        </div>

        <Card title="Camera Information" className="rounded-2xl shadow-md h-full">
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Name">{camera.name}</Descriptions.Item>
            <Descriptions.Item label="Latitude">{camera.latitude}</Descriptions.Item>
            <Descriptions.Item label="Longitude">{camera.longitude}</Descriptions.Item>
            <Descriptions.Item label="Country">{camera.country}</Descriptions.Item>
            <Descriptions.Item label="City">{camera.city}</Descriptions.Item>
            <Descriptions.Item label="Country Code">{camera.countryCode}</Descriptions.Item>
            <Descriptions.Item label="Zip Code">{camera.zipCode}</Descriptions.Item>
            <Descriptions.Item label="Timezone">{camera.timezone}</Descriptions.Item>
            <Descriptions.Item label="Status">{camera.healthStatusEnum}</Descriptions.Item>
            <Descriptions.Item label="Description">{camera.description}</Descriptions.Item>
          </Descriptions>
        </Card>
      </div>
    </div>
  );
};

export default StreamCameraDetail;