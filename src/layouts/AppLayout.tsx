import { Navigate } from 'react-router';
import { Dashboard } from '../components/Dashboard';
import { useUser } from '../hooks/useUser';
import { useAuthStore } from '../stores/authStore';

export default function AppLayout() {
  const isAuth = useAuthStore((store) => store.isAuth);
  const { data, isLoading, isError } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !isAuth) {
    return <Navigate to="/" />;
  }

  if (data) return <Dashboard data={data} />;
}
