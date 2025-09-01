import { CameraHealthStatus } from "models/cameraStatus.model";
import axiosNoAuth from "./axiosNoAuth";


const cameraApi = {
    getCameraToCheck: async () => {
        const res = await axiosNoAuth.get(`/cameras/health-check`);
        return res.data;
    },

    updateHealthStatus: async (id: number, status: CameraHealthStatus): Promise<CameraHealthStatus> => {
        const res = await axiosNoAuth.put(`/cameras/${id}/health-status`, status );
        return res.data;
    }
}

export default cameraApi;
