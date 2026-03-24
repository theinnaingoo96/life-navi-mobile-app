import apiClient from './apiClient';

export const authService = {
    login: async (email: string, password: string, deviceName?: string) => {
        const response = await apiClient.post('/auth/login', {
            email,
            password,
            device_name: deviceName,
        });
        return response.data;
    },

    getMe: async () => {
        const response = await apiClient.get('/auth/me');
        return response.data;
    },
};