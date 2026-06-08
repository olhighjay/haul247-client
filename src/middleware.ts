import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  clearAuthenticationCookiesOnResponse,
  setAuthenticationCookiesOnResponse,
} from "@/utils/auth-cookie-headers";
import { refreshAuthenticationTokens } from "@/lib/auth-token-service";
import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from "@/utils/constants";

const hasAuthenticationCookies = (request: NextRequest): boolean => {
  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE_NAME)?.value;
  const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE_NAME)?.value;

  return Boolean(accessToken || refreshToken);
};

const refreshSessionCookies = async (
  request: NextRequest,
): Promise<NextResponse | null> => {
  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE_NAME)?.value;
  const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE_NAME)?.value;

  if (accessToken || !refreshToken) {
    return null;
  }

  const refreshed = await refreshAuthenticationTokens(refreshToken);

  if (!refreshed) {
    const loginUrl = new URL("/login", request.url);
    const response = NextResponse.redirect(loginUrl);
    clearAuthenticationCookiesOnResponse(response);
    return response;
  }

  const response = NextResponse.redirect(request.url);
  setAuthenticationCookiesOnResponse(
    response,
    refreshed.user,
    refreshed.tokens,
  );

  return response;
};

export const middleware = async (request: NextRequest) => {
  const refreshedResponse = await refreshSessionCookies(request);

  if (refreshedResponse) {
    return refreshedResponse;
  }

  const { pathname } = request.nextUrl;
  const userIsAuthenticated = hasAuthenticationCookies(request);

  if (pathname.startsWith("/dashboard") && !userIsAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname === "/login" && userIsAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (pathname === "/" && userIsAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (pathname === "/" && !userIsAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/", "/login", "/dashboard/:path*"],
};
