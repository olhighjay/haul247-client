"use client";

import { useState } from "react";
import { EyeClosedIcon } from "@/components/icons/eye-closed-icon";
import { EyeOpenIcon } from "@/components/icons/eye-open-icon";

interface PasswordInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
}

export const PasswordInput = ({
  id,
  value,
  onChange,
  placeholder,
  autoComplete = "current-password",
}: PasswordInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((previous) => !previous);
  };

  return (
    <div className="relative">
      <input
        id={id}
        type={isPasswordVisible ? "text" : "password"}
        autoComplete={autoComplete}
        required
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-border bg-white py-2.5 pr-11 pl-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
        placeholder={placeholder}
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        aria-label={isPasswordVisible ? "Hide password" : "Show password"}
        className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
      >
        {isPasswordVisible ? <EyeClosedIcon /> : <EyeOpenIcon />}
      </button>
    </div>
  );
};
