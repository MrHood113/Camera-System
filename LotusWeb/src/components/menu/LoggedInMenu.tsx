import { ProfileOutlined, LogoutOutlined, ProductOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { QueryClient } from "@tanstack/react-query";
import userApi from "../../api/userApi";

export const getLoggedInMenuItems = (
  id: number | null,
  role: string | null,
  handleNavigate: (path: string) => void,
  handleLogout: () => void,
  queryClient: QueryClient
): MenuProps["items"] => {
  const items: MenuProps["items"] = [
    {
      key: "profile",
      label: "Profile",
      icon: <ProfileOutlined />,
      onClick: async () => {
        if (!id) return;
        await queryClient.prefetchQuery({
          queryKey: ["user", id],
          queryFn: () => userApi.getUserById(id),
        });
        handleNavigate("/profile");
      },
    },
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  if (role === "ADMIN") {
    items.unshift({
      key: "manage",
      label: "Manage",
      icon: <ProductOutlined />,
      onClick: () => handleNavigate("/dashboard"),
    });
  }

  return items;
};
