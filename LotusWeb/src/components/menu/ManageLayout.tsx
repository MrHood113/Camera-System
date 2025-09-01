import React, { useState } from 'react';
import { VideoCameraOutlined, UserOutlined, LeftOutlined, RightOutlined,} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';


const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: string,
  icon?: React.ReactNode
): MenuItem {
  return { key, icon, label } as MenuItem;
}

const menuItems: MenuItem[] = [
  getItem('Dashboard', '/dashboard', <UserOutlined />),
  getItem('Manage Cameras', '/manage-cameras', <VideoCameraOutlined />),
];
  

interface ManageLayoutProps {
  children: React.ReactNode;
}

const ManageLayout: React.FC<ManageLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const siderWidth = collapsed ? 62 :120;

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  const selectedKey = location.pathname;
  const breadcrumbItems = [
    {
      title: <a onClick={() => navigate('/homepage')}>Home</a>,
    },
    {
      title:
        selectedKey === '/dashboard' ? (
          <a onClick={() => navigate('/dashboard')}>Dashboard</a>
        ) : (
          <a onClick={() => navigate('/manage-cameras')}>Manage Cameras</a>
        ),
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  return (
    <Layout className="h-full pt-20">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        breakpoint="lg"
        onBreakpoint={(broken) => setCollapsed(broken)}
        theme="light"
        className='fixed top-20 left-0 h-[calc(100vh-64px)] overflow-auto transition-all duration-300 ease-in-out'
      >
        <Menu
          theme="light"
          mode="inline"
          items={menuItems}
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
          className='p-2'
        />

        {/* Toggle button */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-8 h-8 flex items-center justify-center rounded-full border hover:bg-gray-100 transition"
          >
            {collapsed ? <RightOutlined  size={18} /> : <LeftOutlined size={18} />}
          </button>
        </div>
        
      </Sider>

      <Layout 
        className='flex flex-col transition-all duration-300 ease-in-out h-full'
        style={{ 
          marginLeft: siderWidth,
        }}
      >
        <Content 
          className="flex flex-col mx-10 mb-8 flex-1 transition-all duration-300 ease-in-out"
          style={{
            marginLeft: siderWidth,
          }}
        >
          <Breadcrumb className="my-4 mx-4" items={breadcrumbItems} />
          <div
            className="p-4 flex-1 rounded-lg"
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ManageLayout;
