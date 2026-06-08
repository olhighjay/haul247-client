"use client";

import { usePathname } from "next/navigation";

interface UseActivePathOptions {
  exact?: boolean;
}

export const useActivePath = (
  path: string,
  options: UseActivePathOptions = {},
): boolean => {
  const pathname = usePathname();

  if (options.exact) {
    return pathname === path;
  }

  return pathname === path || pathname.startsWith(`${path}/`);
};
