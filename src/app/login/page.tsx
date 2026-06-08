import { LoginForm } from "@/components/auth/login-form";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-lg font-bold text-white">
            H
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Welcome to Haul247
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Sign in to manage freight bookings
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-white p-8 shadow-sm">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
