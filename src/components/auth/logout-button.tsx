"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { postAppRoute } from "@/lib/http-client";
import { useAuthenticationStore } from "@/store/authentication-store";

export const LogoutButton = () => {
  const router = useRouter();
  const clearUser = useAuthenticationStore((state) => state.clearUser);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      await postAppRoute("/api/auth/logout");
      clearUser();
      router.push("/login");
      router.refresh();
    } catch {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoading}
      className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 disabled:opacity-50"
    >
      {isLoading ? "Signing out…" : "Logout"}
    </button>
  );
};
