import { Link, Navigate, Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { useAuthStore } from '../stores/authStore';

export default function AuthLayout() {
  const isAuth = useAuthStore((store) => store.isAuth);

  if (isAuth) {
    return <Navigate to="/admin" />;
  }

  

  return (
    <>
      {/* Logo principal */}
      <Link to="/" className="w-40 flex items-center py-2 px-3 sm:px-6 absolute lg:top-4">
        <img
          src="/enlazizy-logo-v4.png"
          alt="Logo"
          className="object-contain rounded-lg transition-all duration-300 hover:opacity-80 hover:scale-105"
        />
      </Link>

      {/* Layout principal */}
      <div className="h-screen grid grid-cols-1 lg:grid-cols-2">
        {/* Sección izquierda (Oculta en móviles) */}
        <div className="hidden lg:flex justify-center items-center h-screen bg-amber-300">
          <img
            src="/enlazizy-logo.svg"
            alt="Logo app"
            className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Sección derecha con contenido dinámico */}
        <div className="h-screen overflow-auto p-6">
          <Outlet />
        </div>
      </div>

      {/* Notificaciones */}
      <ToastContainer
        autoClose={2000}
        pauseOnHover={false}
        hideProgressBar
        closeOnClick
      />
    </>
  );
}
