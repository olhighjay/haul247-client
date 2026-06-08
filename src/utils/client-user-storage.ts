import { USER_COOKIE_NAME } from "@/utils/constants";
import type { AuthenticatedUser } from "@/types/auth";

const PENDING_USER_STORAGE_KEY = "haul247_pending_user";

export const stashPendingUser = (user: AuthenticatedUser): void => {
  sessionStorage.setItem(PENDING_USER_STORAGE_KEY, JSON.stringify(user));
};

export const clearPendingUser = (): void => {
  sessionStorage.removeItem(PENDING_USER_STORAGE_KEY);
};

const readPendingUser = (): AuthenticatedUser | null => {
  const storedUser = sessionStorage.getItem(PENDING_USER_STORAGE_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser) as AuthenticatedUser;
  } catch {
    return null;
  }
};

const readUserFromCookie = (): AuthenticatedUser | null => {
  const cookieMatch = document.cookie.match(
    new RegExp(`(?:^|; )${USER_COOKIE_NAME}=([^;]*)`),
  );

  if (!cookieMatch) {
    return null;
  }

  try {
    return JSON.parse(decodeURIComponent(cookieMatch[1])) as AuthenticatedUser;
  } catch {
    return null;
  }
};

export const readClientAuthenticatedUser = (): AuthenticatedUser | null => {
  const pendingUser = readPendingUser();

  if (pendingUser) {
    clearPendingUser();
    return pendingUser;
  }

  return readUserFromCookie();
};

export const hasClientAuthenticationCookies = (): boolean => {
  return (
    document.cookie.includes("haul247_access_token=") ||
    document.cookie.includes("haul247_refresh_token=") ||
    sessionStorage.getItem(PENDING_USER_STORAGE_KEY) !== null
  );
};
