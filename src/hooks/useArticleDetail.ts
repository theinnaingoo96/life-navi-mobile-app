import { useQuery } from '@tanstack/react-query';
import { articleService } from '@/services/articleService';

export const useArticleDetail = (uuid: string) => {
  return useQuery({
    queryKey: ['article-detail', uuid],
    queryFn: async () => {
      const response = await articleService.getArticleDetails(uuid);
      return response.data.article;
    },
    enabled: !!uuid,
  });
};
