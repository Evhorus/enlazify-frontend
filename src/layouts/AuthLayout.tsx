import { Navigate, Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { useAuthStore } from '../stores/authStore';

export default function AuthLayout() {
  const isAuth = useAuthStore((store) => store.isAuth);

  if (isAuth) {
    return <Navigate to="/admin" />;
  }

  return (
    <>
      <div className="mx-auto h-screen grid grid-cols-1 lg:grid-cols-2">
        <div className="hidden lg:flex bg-amber-300 justify-center items-center h-screen overflow-hidden">
          <img
            src="/enlazizy-logo.svg"
            alt="Logo app"
            className="max-w-[500px]"
          />
        </div>
        <div className="h-screen overflow-auto">
          <Outlet />
        </div>
      </div>
      <ToastContainer autoClose={2000} pauseOnHover={false} />
    </>
  );
}
