import { useEffect } from 'react';
import { useSidebarStore } from '../stores/sidebarStore';
import { IoCloseOutline } from 'react-icons/io5';
import { Link } from 'react-router';


const Sidebar = () => {
  const { isOpen, closeSidebar } = useSidebarStore();

  // Cierra con ESC
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeSidebar();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closeSidebar]);

  return (
    <>
      {/* Backdrop con blur */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-md z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar (Mobile-only) */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white text-black z-50 p-6 shadow-2xl transition-transform transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden rounded-l-3xl`}
      >
        {/* Botón de cerrar */}
        <button
          onClick={closeSidebar}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 transition"
        >
          <IoCloseOutline size={35} className="text-black" />
        </button>

        {/* Nombre de la app */}
        <h1 className="text-2xl font-bold text-center mt-8 tracking-wide">Enlazify</h1>

        <nav className="mt-12 space-y-6 flex flex-col items-center">
          <Link
            to="/auth/login"
            className="w-4/5 px-5 py-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition transform hover:scale-105 text-center"
          >
            Iniciar Sesión
          </Link>
          <Link
            to="/auth/register"
            className="w-4/5 px-5 py-3 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition transform hover:scale-105 text-center"
          >
            Registrarse
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
