import type { Avatar, Background } from "../types/user.type";
import axiosClient from "./axiosClient";

const userImageApi = {
  updateAvatar: async (id: number, file: File): Promise<Avatar> => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axiosClient.patch(`/users/${id}/avatar`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  updateBackground: async (id: number, file: File): Promise<Background> => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axiosClient.patch(`/users/${id}/background`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },
};

export default userImageApi;