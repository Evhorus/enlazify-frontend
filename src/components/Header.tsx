import { AdminNavigation } from './AdminNavigation';
import { HomeNavigation } from './HomeNavigation';
import { useAuthStore } from '../stores/authStore';
import { Link } from 'react-router';

export const Header = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuth);

  return (
    <header className="bg-gradient-to-r from-bgheader to-indigo-600 shadow-md p-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-2 px-3 sm:px-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
        {/* Logo y título */}
        <Link to="/" className="w-40 flex items-center">
          <img
            src="/enlazizy-logo-v4.png"
            alt="Logo"
            className="object-contain rounded-lg transition-all duration-300 hover:opacity-80 hover:scale-105"
          />
        </Link>

        {isAuthenticated ? <AdminNavigation /> : <HomeNavigation />}
      </div>
    </header>
  );
};
