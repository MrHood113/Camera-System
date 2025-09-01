import { LoginOutlined, UserAddOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";

export const getLoggedOutMenuItems = (
  handleNavigate: (path: string) => void
): MenuProps["items"] => [
  {
    key: "login",
    label: "Login",
    icon: <LoginOutlined />,
    onClick: () => handleNavigate("/login"),
  },
  {
    key: "register",
    label: "Register",
    icon: <UserAddOutlined />,
    onClick: () => handleNavigate("/register"),
  },
];
