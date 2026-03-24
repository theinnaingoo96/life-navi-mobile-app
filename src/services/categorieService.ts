import apiClient from './apiClient';

export const categorieService = {
    getCategories: async () => {
        const response = await apiClient.get('/categories');
        return response.data;
    },
};