import { cookies } from "next/headers";
import { apiPost } from "@/lib/http-client";
import type {
  AuthenticatedSession,
  AuthenticatedUser,
  AuthenticationTokens,
  LoginResponseData,
} from "@/types/auth";
import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
  TOKEN_MAX_AGE_SECONDS,
  USER_COOKIE_NAME,
} from "@/utils/constants";

export const setAuthenticationCookies = async (
  user: AuthenticatedUser,
  tokens: AuthenticationTokens,
): Promise<void> => {
  const cookieStore = await cookies();

  cookieStore.set(ACCESS_TOKEN_COOKIE_NAME, tokens.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: tokens.expires_in,
  });

  cookieStore.set(REFRESH_TOKEN_COOKIE_NAME, tokens.refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: TOKEN_MAX_AGE_SECONDS,
  });

  cookieStore.set(USER_COOKIE_NAME, JSON.stringify(user), {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: TOKEN_MAX_AGE_SECONDS,
  });
};

export const clearAuthenticationCookies = async (): Promise<void> => {
  const cookieStore = await cookies();

  cookieStore.delete(ACCESS_TOKEN_COOKIE_NAME);
  cookieStore.delete(REFRESH_TOKEN_COOKIE_NAME);
  cookieStore.delete(USER_COOKIE_NAME);
};

export const persistAuthenticationSession = async (
  user: AuthenticatedUser,
  tokens: AuthenticationTokens,
): Promise<void> => {
  try {
    await setAuthenticationCookies(user, tokens);
  } catch {
    // Cookie writes are only allowed in Route Handlers and Server Actions.
  }
};

export const getStoredUser = async (): Promise<AuthenticatedUser | null> => {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get(USER_COOKIE_NAME)?.value;

  if (!userCookie) {
    return null;
  }

  try {
    return JSON.parse(userCookie) as AuthenticatedUser;
  } catch {
    return null;
  }
};

export const getAuthenticatedSession = async (): Promise<AuthenticatedSession | null> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE_NAME)?.value;
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE_NAME)?.value;
  const user = await getStoredUser();

  if (!accessToken || !user) {
    return null;
  }

  return {
    user,
    accessToken,
    refreshToken: refreshToken ?? "",
  };
};

export const loginWithCredentials = (
  email: string,
  password: string,
): Promise<LoginResponseData> => {
  return apiPost<LoginResponseData>("/auth/login", { email, password });
};

export const logoutFromApi = (accessToken: string): Promise<void> => {
  return apiPost("/auth/logout", {}, accessToken);
};
