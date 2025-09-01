// components/SuccessNotification.tsx
import { Modal } from 'antd';
import { useEffect } from 'react';
import { CheckOutlined } from '@ant-design/icons';

interface SuccessNotificationProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

const SuccessNotification: React.FC<SuccessNotificationProps> = ({ open, message, onClose }) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  return (
    <Modal
      open={open}
      footer={null}
      closable={false}
      centered
      maskClosable={false}
      className="success-popup-modal !w-[320px] !p-0"
    >
      <div className="text-center">
        <div className="w-20 h-20 rounded-full border-4 border-green-500/20 flex items-center justify-center mx-auto mb-4">
          <CheckOutlined className="text-4xl text-green-500" />
        </div>
        <p className="text-lg font-semibold">{message}</p>
      </div>
    </Modal>
  );
};

export default SuccessNotification;
