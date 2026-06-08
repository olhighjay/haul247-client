"use client";

import { create } from "zustand";
import { readClientAuthenticatedUser } from "@/utils/client-user-storage";
import type { AuthenticatedUser } from "@/types/auth";

interface AuthenticationStoreState {
  user: AuthenticatedUser | null;
  isHydrated: boolean;
  setUser: (user: AuthenticatedUser) => void;
  clearUser: () => void;
  hydrateUser: () => void;
}

export const useAuthenticationStore = create<AuthenticationStoreState>(
  (set) => ({
    user: null,
    isHydrated: false,
    setUser: (user) => set({ user, isHydrated: true }),
    clearUser: () => set({ user: null, isHydrated: true }),
    hydrateUser: () => {
      const user = readClientAuthenticatedUser();
      set({ user, isHydrated: true });
    },
  }),
);
