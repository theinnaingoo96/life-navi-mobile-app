import { useQuery } from '@tanstack/react-query';
import { categorieService } from '@/services/categorieService';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const data = await categorieService.getCategories();
      return Array.isArray(data.data) ? data.data : [];
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, // 1 day
  });
};
