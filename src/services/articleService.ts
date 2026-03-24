import apiClient from './apiClient';

export const articleService = {
    getArticles: async (status?: 'all' | 'draft' | 'published' | 'pending' | 'rejected') => {
        const response = await apiClient.get('user-articles', {
            params: { status },
        });
        return response.data;
    },

    createArticle: async (data: any) => {
        const response = await apiClient.post('user-articles', data);
        return response.data;
    },

    getArticleDetails: async (uuid: string) => {
        const response = await apiClient.get(`user-articles/${uuid}`);
        return response.data;
    },

    updateArticle: async (uuid: string, data: any) => {
        const response = await apiClient.put(`user-articles/${uuid}`, data);
        return response.data;
    },

    deleteArticle: async (uuid: string) => {
        const response = await apiClient.delete(`user-articles/${uuid}`);
        return response.data;
    },
};