import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { API } from '../api/axios'; 
import { Token, User } from '../types/auth';

const initialState = {
  token: null as Token | null,
  user: null as User | null,
};

type WebState = {
  token: Token | null;
  user: User | null;
  setToken: (token: Token | null) => void;
  clearToken: () => void;
  getToken: () => Token | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  getUser: () => User | null;
  fetchUser: () => Promise<void>;
  clearAuth: () => void;
};

export const useWebStore = create<WebState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setToken: (token) => set({ token }),
      clearToken: () => set({ token: null }),
      getToken: () => get().token,

      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      getUser: () => get().user,

      fetchUser: async () => {
        const token = get().token;
        if (!token) return;

        try {
          const response = await API.get('/auth/me');
          set({ user: response.data });
        } catch (error) {
          console.error('Failed to fetch user:', error);
          set({ user: null, token: null });
        }
      },

      clearAuth: () => set({ token: null, user: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);