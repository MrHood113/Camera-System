import { Pagination, Spin, Typography, } from 'antd';
import CameraPanel from '../components/CameraPanel';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { useSearchCameras, useStreamCameras } from '../hooks';
import { setCurrentPage } from '../store/slices/liveViewSlice';
import { useNavigate } from 'react-router-dom';
import { createWsUrl } from '../utils/createWsUrl';
import slugify from 'slugify';
import type { StreamCamera } from '../types/camera.type';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';

const { Text } = Typography;

const LivePage: React.FC = () => {
  const currentPage = useSelector((state: RootState) => state.liveView.currentPage);
  const pageSize = 9;

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch] = useDebounce(searchQuery, 500);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const { data: cameras = [], isLoading, error } = useStreamCameras();
  const { data: searchResults = [], isLoading: isSearchLoading } = useSearchCameras(debouncedSearch);

  const displayData = searchQuery ? searchResults : cameras;
  const paginatedData = displayData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">
            <Spin size="large" />
          </div>;
  }
  if (error) return <div>Failed to load cameras</div>;

  const handleClick = (camera: StreamCamera) => {
    const slug = slugify(camera.name, { lower: true });
    navigate(`/stream-camera/${slug}/${camera.id}`);
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-100">
      <div className="p-10 rounded-lg shadow">
        <div className="flex items-center justify-between w-full mb-10">
          <h2 className="text-3xl font-semibold text-center flex-1 pl-64">Camera List</h2>

          <div className="relative md:block mr-4 p-1 flex items-center justify-center">
              <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 text-sm"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.5 3.5a7.5 7.5 0 0013.15 13.15z" />
                  </svg>
              </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 items-center justify-center mt-5">
          {isSearchLoading ? (
            <div className="col-span-full text-center py-10">Searching...</div>
          ) : (
            paginatedData.map((camera) => (
              <div 
                onClick={() => handleClick(camera)} 
                key={camera.id} 
                className="flex flex-col justify-center items-center bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
              >
                <CameraPanel
                  wsUrl={createWsUrl(camera.id)}
                  previewOnly={true}
                  streamUrl={camera.streamUrl}
                  streamType={camera.healthCheckTypeEnum ?? undefined}
                />
                <div className="w-full text-center p-3 border-t">
                  <div className="font-semibold text-base">{camera.name}</div>
                  <Text type="secondary" className="text-sm">
                    {camera.country}, {camera.city}
                  </Text>
                </div>
              </div>
            ))
          )}
        </div>

        <Pagination
          className="mt-7 mb-3 flex justify-center"
          current={currentPage}
          total={displayData.length}
          pageSize={pageSize}
          onChange={(page) => dispatch(setCurrentPage(page))}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default LivePage;
