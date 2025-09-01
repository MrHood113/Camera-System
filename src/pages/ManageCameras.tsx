import React from 'react';
import { CameraTable,  } from '../components';
import { message, Spin } from 'antd';
import { useCameras } from '../hooks';
import ManageLayout from '../components/menu/ManageLayout';

const HomePage: React.FC = () => {
  const {
    isLoading,
    isError,
    error,
  } = useCameras();

  if (isError) {
    message.error('Unable to load camera list');
    console.error(error);
  }

  return (
    <ManageLayout>
      <div> 
          {isLoading ? (
            <div className="flex justify-center items-center">
              <Spin size="large" />
            </div>
          ) : (
            <CameraTable/>
          )} 
      </div>
    </ManageLayout>
  );
};

export default HomePage;

