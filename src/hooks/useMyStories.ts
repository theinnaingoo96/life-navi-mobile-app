import { useQuery } from '@tanstack/react-query';
import { articleService } from '@/services/articleService';

export type ArticleStatus = 'all' | 'draft' | 'published' | 'pending' | 'rejected';

export const useMyStories = (status?: ArticleStatus) => {
  return useQuery({
    queryKey: ['my-stories', status],
    queryFn: async () => {
      const response = await articleService.getArticles(status === 'all' ? undefined : status);
      return Array.isArray(response.data.data) ? response.data.data : [];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
