import { IoExitOutline } from 'react-icons/io5';
import { useAuthStore } from '../stores/authStore';
import { useQueryClient } from '@tanstack/react-query';

export const AdminNavigation = () => {
  const logout = useAuthStore((state) => state.logout);
  const queryClient = useQueryClient();

  const handleLogout = () => {
    logout();
    queryClient.invalidateQueries({ queryKey: ['user'] });
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-gray-700 active:scale-95 cursor-pointer flex gap-2 items-center"
    >
      <IoExitOutline size={20} />
      <span className="hidden sm:block">Cerrar Sesión</span>
    </button>
  );
};
