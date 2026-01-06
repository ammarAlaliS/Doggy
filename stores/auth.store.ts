import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { jwtUtils, secureStorage } from '../utils/secure-storage';

export interface AuthUser {
  id: string;
  email?: string;
  firstName: string;
  lastName: string;
  profileImgUrl?: string;
  isActive?: boolean;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  setAuth: (user: AuthUser, token: string) => void;
  logout: () => void;
  isTokenValid: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      setAuth: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
      isTokenValid: () => {
        const token = get().token;
        if (!token) return false;
        return !jwtUtils.isExpired(token);
      },
    }),
    {
      name: 'auth-secure-storage',
      storage: createJSONStorage(() => secureStorage),
    }
  )
);
