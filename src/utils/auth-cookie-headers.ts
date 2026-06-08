import type { NextResponse } from "next/server";
import type { AuthenticatedUser, AuthenticationTokens } from "@/types/auth";
import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
  TOKEN_MAX_AGE_SECONDS,
  USER_COOKIE_NAME,
} from "@/utils/constants";

const cookieOptions = {
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export const setAuthenticationCookiesOnResponse = (
  response: NextResponse,
  user: AuthenticatedUser,
  tokens: AuthenticationTokens,
): void => {
  response.cookies.set(ACCESS_TOKEN_COOKIE_NAME, tokens.access_token, {
    ...cookieOptions,
    httpOnly: true,
    maxAge: tokens.expires_in,
  });

  response.cookies.set(REFRESH_TOKEN_COOKIE_NAME, tokens.refresh_token, {
    ...cookieOptions,
    httpOnly: true,
    maxAge: TOKEN_MAX_AGE_SECONDS,
  });

  response.cookies.set(USER_COOKIE_NAME, JSON.stringify(user), {
    ...cookieOptions,
    httpOnly: false,
    maxAge: TOKEN_MAX_AGE_SECONDS,
  });
};

export const clearAuthenticationCookiesOnResponse = (
  response: NextResponse,
): void => {
  response.cookies.delete(ACCESS_TOKEN_COOKIE_NAME);
  response.cookies.delete(REFRESH_TOKEN_COOKIE_NAME);
  response.cookies.delete(USER_COOKIE_NAME);
};
