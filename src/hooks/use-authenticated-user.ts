"use client";

import { useEffect } from "react";
import { useAuthenticationStore } from "@/store/authentication-store";
import type { AuthenticatedUser } from "@/types/auth";

export const useAuthenticatedUser = (): AuthenticatedUser | null => {
  const user = useAuthenticationStore((state) => state.user);
  const isHydrated = useAuthenticationStore((state) => state.isHydrated);
  const hydrateUser = useAuthenticationStore((state) => state.hydrateUser);

  useEffect(() => {
    if (!isHydrated) {
      hydrateUser();
    }
  }, [isHydrated, hydrateUser]);

  return user;
};
