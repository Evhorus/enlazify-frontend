import { IoMenuOutline } from 'react-icons/io5';
import { Link } from 'react-router';

export const HomeNavigation = () => {
  return (
    <div className="flex gap-3">
      <Link
        className="hidden  bg-gray-300 text-black px-5 py-3 rounded-md font-bold transition-all duration-300 hover:bg-gray-400 active:scale-95 sm:block"
        to="/auth/login"
      >
        Iniciar Sesión
      </Link>

      <Link
        className="hidden  bg-gray-900 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:bg-gray-700 active:scale-95 sm:block"
        to="/auth/register"
      >
        Registrarse
      </Link>
      <IoMenuOutline size={40} className="sm:hidden" />
    </div>
  );
};
