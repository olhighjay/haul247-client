"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { PasswordInput } from "@/components/auth/password-input";
import { postAppRoute } from "@/lib/http-client";
import { useAuthenticationStore } from "@/store/authentication-store";
import type { AuthenticatedUser } from "@/types/auth";

interface LoginResponseData {
  user: AuthenticatedUser;
}

export const LoginForm = () => {
  const router = useRouter();
  const setUser = useAuthenticationStore((state) => state.setUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const payload = await postAppRoute<LoginResponseData>("/api/auth/login", {
        email,
        password,
      });

      if (!payload.status) {
        setErrorMessage(payload.message ?? "Login failed. Please try again.");
        setIsLoading(false);
        return;
      }

      setUser(payload.data.user);
      router.push("/dashboard");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to connect. Please check your network.";
      setErrorMessage(message);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errorMessage ? (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {errorMessage}
        </div>
      ) : null}

      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Email address
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          placeholder="admin@haul247.test"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Password
        </label>
        <PasswordInput
          id="password"
          value={password}
          onChange={setPassword}
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
};
