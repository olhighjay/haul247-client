import { NextResponse } from "next/server";
import {
  loginWithCredentials,
  setAuthenticationCookies,
} from "@/lib/authentication";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const email = body.email as string;
    const password = body.password as string;

    if (!email || !password) {
      return NextResponse.json(
        { status: false, message: "Email and password are required" },
        { status: 422 },
      );
    }

    const loginData = await loginWithCredentials(email, password);
    await setAuthenticationCookies(loginData.user, loginData.tokens);

    return NextResponse.json({
      status: true,
      message: "Login successful",
      data: { user: loginData.user },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Login failed";

    return NextResponse.json(
      { status: false, message },
      { status: 401 },
    );
  }
};
