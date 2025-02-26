import { create } from 'zustand';

interface AuthState {
  authToken: string | null;
  isAuth: boolean;
  setAuthToken: (authToken: string) => void;
  logout: () => void;
}

const getTokenFromStorage = (): string | null => {
  return localStorage.getItem('AUTH_TOKEN');
};

export const useAuthStore = create<AuthState>((set) => ({
  authToken: getTokenFromStorage(),
  isAuth: !!getTokenFromStorage(),
  setAuthToken: (authToken) => {
    localStorage.setItem('AUTH_TOKEN', authToken);
    set({ authToken, isAuth: true });
  },
  logout: () => {
    localStorage.removeItem('AUTH_TOKEN');
    set({ authToken: null, isAuth: false });
  },
}));
