import React from "react";
import { Tag, Tooltip, Space, Dropdown } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { Camera } from "../types/camera.type";
import { getUTCOffset } from "../utils/timezone";
import { DeleteOutlined, DownOutlined, EditOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";

const getCameraColumns = (
  handleMenuClick: (key: string, record: Camera) => void
): ColumnsType<Camera> => {
  const menuItems = [
    {
      key: "edit",
      label: "View Info",
      icon: <EditOutlined />,
    },
    {
      key: "delete",
      label: "Delete Camera",
      icon: <DeleteOutlined />,
    },
  ];

  const renderMenu = (record: Camera): MenuProps => ({
    items: menuItems,
    onClick: ({ key }) => handleMenuClick(key, record),
  });

  return [
    {
      title: "Camera Name",
      dataIndex: "name",
      key: "name",
      width: 200,
      fixed: "left",
      render: (text: string) => (
        <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
          {text}
        </div>
      ),
    },
    {
      title: "Latitude",
      dataIndex: "latitude",
      key: "latitude",
      width: 120,
      ellipsis: { showTitle: false },
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "Longitude",
      dataIndex: "longitude",
      key: "longitude",
      width: 120,
      ellipsis: { showTitle: false },
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      width: 150,
    },
    {
      title: "Country Code",
      dataIndex: "countryCode",
      key: "countryCode",
      width: 130,
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      width: 130,
    },
    {
      title: "Zip Code",
      dataIndex: "zipCode",
      key: "zipCode",
      width: 100,
    },
    {
      title: "Timezone",
      dataIndex: "timezone",
      key: "timezone",
      width: 220,
      render: (zoneId: string) => {
        const offset = getUTCOffset(zoneId);
        return `${offset} (${zoneId})`;
      },
    },
    {
      title: "IP Address",
      dataIndex: "ipAddress",
      key: "ipAddress",
      width: 170,
    },
    {
      title: "Health Status",
      dataIndex: "healthStatusEnum",
      key: "healthStatusEnum",
      width: 150,
      render: (status: string | null | undefined) => {
        const colorMap = {
          ONLINE: "green",
          OFFLINE: "red",
          UNKNOWN: "yellow",
          UNREACHABLE: "gray",
        };
        const safeStatus = (status?.toUpperCase() ?? "UNKNOWN") as keyof typeof colorMap;
        return <Tag color={colorMap[safeStatus]}>{safeStatus}</Tag>;
      },
    },
    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      width: 130,
      render: (isActive: boolean) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Type",
      dataIndex: "healthCheckTypeEnum",
      key: "healthCheckTypeEnum",
      width: 100,
    },
    {
      title: "Last Ping",
      dataIndex: "lastPingAt",
      key: "lastPingAt",
      width: 180,
      render: (timestamp: string | null) =>
        timestamp ? new Date(timestamp).toLocaleString() : "Never",
    },
    {
      title: "Last Status Change",
      dataIndex: "lastStatusChangeAt",
      key: "lastStatusChangeAt",
      width: 180,
      render: (timestamp: string | null) =>
        timestamp ? new Date(timestamp).toLocaleString() : "N/A",
    },
    {
      title: "Stream URL",
      dataIndex: "streamUrl",
      key: "streamUrl",
      width: 300,
      ellipsis: { showTitle: false },
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 300,
      ellipsis: { showTitle: false },
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
      width: 300,
      ellipsis: { showTitle: false },
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <Space size="middle">
          <Dropdown menu={renderMenu(record)} trigger={["hover"]}>
            <a className="text-blue-600 cursor-pointer">
              More <DownOutlined />
            </a>
          </Dropdown>
        </Space>
      ),
    },
  ];
};

export default getCameraColumns;
