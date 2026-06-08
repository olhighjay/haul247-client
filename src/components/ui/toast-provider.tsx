"use client";

import { Toaster } from "react-hot-toast";

export const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          borderRadius: "0.75rem",
          fontSize: "0.875rem",
        },
        success: {
          iconTheme: {
            primary: "#2563eb",
            secondary: "#ffffff",
          },
        },
      }}
    />
  );
};
