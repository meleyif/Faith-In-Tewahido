import { create } from 'zustand';

export type Role = 'super_admin' | 'school_admin' | 'instructor' | 'student' | null;

interface AuthState {
  user: any | null;
  role: Role;
  tenantId: string | null;
  isLoading: boolean;
  setAuth: (user: any, role: Role, tenantId: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null, 
  role: null, 
  tenantId: null,
  isLoading: false,
  setAuth: (user, role, tenantId) => set({ user, role, tenantId }),
  logout: () => set({ user: null, role: null, tenantId: null }),
}));
