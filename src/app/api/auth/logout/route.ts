import { NextResponse } from "next/server";
import {
  clearAuthenticationCookies,
  getAuthenticatedSession,
  logoutFromApi,
} from "@/lib/authentication";

export const POST = async () => {
  const session = await getAuthenticatedSession();

  if (session?.accessToken) {
      await logoutFromApi(session.accessToken);
  }

  await clearAuthenticationCookies();

  return NextResponse.json({
    status: true,
    message: "Logged out successfully",
  });
};
