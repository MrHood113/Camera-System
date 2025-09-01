import { message } from 'antd';
import { AxiosError } from 'axios';

export const handleApiError = (error: unknown, fallbackMessage = 'An error occurred!') => {
    let errorMessage = fallbackMessage;

    if (error && typeof error === 'object' && 'isAxiosError' in error) {
        const axiosError = error as AxiosError<{ message?: string }>;

        if (axiosError.response?.data?.message) {
            errorMessage = axiosError.response.data.message;
        } else if (axiosError.message) {
            errorMessage = axiosError.message;
        }
    }

    message.error(errorMessage);
};
