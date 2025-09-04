// src/components/CameraTable.tsx
import React, { useState } from 'react';
import { message, Pagination, Table, } from 'antd';
import { useNavigate } from 'react-router-dom';
import type { Camera } from '../types/camera.type';
import { useCameras, useDeleteCamera, useSearchCameras } from '../hooks';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { setCurrentPage } from '../store/slices/liveViewSlice';
import SuccessNotification from './SuccessNotification';
import getCameraColumns from './TableColumn';
import { useDebounce } from 'use-debounce';

const CameraTable: React.FC = () => {
  const currentPage = useSelector((state: RootState) => state.liveView.currentPage);
  const [pageSize, setPageSize] = useState(10);
  const [successOpen, setSuccessOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch] = useDebounce(searchQuery, 500);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: cameras = [], isLoading } = useCameras();
  const deleteCameraMutation = useDeleteCamera();
  const { data: searchResults = [], isLoading: isSearchLoading } = useSearchCameras(debouncedSearch);

  const displayData = searchQuery ? searchResults : cameras;
  const paginatedData = displayData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleMenuClick = async (key: string, record: Camera) => {
    if (key === 'edit') {
        navigate(`/camera/${record.id}`, { state: { camera: record } });
    } else if (key === 'delete') {
      deleteCameraMutation.mutate(record.id, {
        onSuccess: () => {
          message.success('Camera deleted successfully');
          setSuccessOpen(true);

          const totalAfterDelete = cameras.length - 1;
          const lastPage = Math.ceil(totalAfterDelete / pageSize);

          if (currentPage > lastPage) {
            setCurrentPage(Math.max(lastPage, 1));
          }
        },
        onError: () => {
          message.error('Failed to delete camera');
        },
      });
    }
  };

  return (
    <div className="min-h-[575px] p-4">
      <div className="bg-white px-4 pb-7 rounded-lg shadow flex flex-col h-150" style={{ maxHeight: 'calc(100vh - 130px)' }}>
        <div className="grid grid-cols-12 items-center w-full py-5">
          {/* Title */}
          <div className="col-span-12 flex justify-center">
            <h2 className="text-3xl font-semibold text-center md:text-left">
              Camera List
            </h2>
          </div>

          {/* Search box */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4 relative p-1 pr-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 
                        focus:outline-none focus:ring-2 focus:ring-pink-400 
                        focus:border-pink-400 text-sm"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.5 3.5a7.5 7.5 0 0013.15 13.15z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <Table
            rowKey="id"
            columns={getCameraColumns(handleMenuClick)}
            dataSource={paginatedData}
            loading={isLoading || isSearchLoading}
            pagination={false}
            scroll={{ x: 1800, }}
          />
        </div>

        <Pagination 
          className='mt-5 flex justify-center' 
          current={currentPage}
          total={displayData.length} 
          pageSize={pageSize} 
          onChange={(page, newPageSize) => {
            dispatch(setCurrentPage(page));
            setPageSize(newPageSize);
          }}
          showSizeChanger={true}
          />

        <SuccessNotification
            open={successOpen}
            message="Camera was deleted success!"
            onClose={() => setSuccessOpen(false)}
        />
      </div>
    </div>
  );
};

export default CameraTable;
