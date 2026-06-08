import { apiPost } from "@/lib/http-client";
import type { RefreshResponseData } from "@/types/auth";

export const refreshAuthenticationTokens = async (
  refreshToken: string,
): Promise<RefreshResponseData | null> => {
  try {
    return await apiPost<RefreshResponseData>("/auth/refresh", {
      refresh_token: refreshToken,
    });
  } catch {
    return null;
  }
};
