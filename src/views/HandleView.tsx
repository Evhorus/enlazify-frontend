import { useQuery } from '@tanstack/react-query';
import { Navigate, useParams } from 'react-router';
import { getUserByHandle } from '../api/enlazify.api';
import { HandleData } from '../components/HandleData';

export default function HandleView() {
  const params = useParams();

  const handle = params.handle!;

  const { data, isLoading, error } = useQuery({
    queryKey: ['handle', handle],
    queryFn: () => getUserByHandle(handle),
    retry: 1,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <Navigate to="/404" />;

  if (data) return <HandleData data={data} />;
}
