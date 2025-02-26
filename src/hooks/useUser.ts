import { useQuery } from '@tanstack/react-query';
import { getUser } from '../api/enlazify.api';

export const useUser = () => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, error, isError };
};
