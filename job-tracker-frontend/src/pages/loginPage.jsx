import { useContext, useState } from "react";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { ApiKeyContext, AuthContext } from "@/components/app/authContext";
import { loginUser } from "@/repository/authApis";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { setUser, setIsAuthenticated } = useContext(AuthContext);
  const { setHasApiKey } = useContext(ApiKeyContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await loginUser({
        email: data.email,
        password: data.password,
      });

      if (!response?.user) {
        toast.error("Invalid server response");
        return;
      }

      setUser(response.user);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(response.user));

      localStorage.setItem(
        "hasApiKey",
        JSON.stringify(response.user?.hasGeminiApiKey),
      );
      setHasApiKey(response.user?.hasGeminiApiKey);

      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      const serverMessage =
        error.response?.data?.error?.message || error.response?.data?.message;

      toast.error(serverMessage || "Failed to log in. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-zinc-950 px-4 py-12 sm:px-6 lg:px-8 font-sans transition-colors duration-200">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-zinc-900 p-8 border border-neutral-200 dark:border-zinc-800 rounded-lg shadow-sm transition-colors duration-200">
        {/* Header */}
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Sign In
          </h2>
          <p className="mt-2 text-sm text-neutral-500 dark:text-zinc-400">
            Welcome back. Please sign in to access your jobs.
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email-address"
                className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-zinc-400 mb-1"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400 dark:text-zinc-550">
                  <FiMail className="h-5 w-5" />
                </div>
                <input
                  id="email-address"
                  {...register("email", { required: "email is required" })}
                  type="email"
                  autoComplete="email"
                  disabled={isSubmitting}
                  className="block w-full pl-10 pr-3 py-2.5 border border-neutral-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-neutral-900 dark:text-zinc-100 placeholder-neutral-400 dark:placeholder-zinc-500 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-zinc-350 focus:border-neutral-900 dark:focus:border-zinc-350 text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="name@example.com"
                />
              </div>
              {errors.email?.message && (
                <p className="text-red-400">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-zinc-400"
                >
                  Password
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400 dark:text-zinc-550">
                  <FiLock className="h-5 w-5" />
                </div>
                <input
                  id="password"
                  {...register("password", {
                    required: "password is required",
                  })}
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  disabled={isSubmitting}
                  className="block w-full pl-10 pr-10 py-2.5 border border-neutral-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-neutral-900 dark:text-zinc-100 placeholder-neutral-400 dark:placeholder-zinc-550 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-zinc-350 focus:border-neutral-900 dark:focus:border-zinc-350 text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isSubmitting}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 dark:text-zinc-550 hover:text-neutral-600 dark:hover:text-zinc-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {showPassword ? (
                    <FiEyeOff className="h-5 w-5" />
                  ) : (
                    <FiEye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password?.message && (
                <p className="text-red-400">{errors.password.message}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`group relative w-full flex justify-center items-center py-2.5 px-4 border border-transparent text-sm font-semibold rounded-md text-white dark:text-zinc-900 bg-neutral-900 hover:bg-neutral-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 dark:focus:ring-zinc-100 dark:focus:ring-offset-zinc-950 transition-colors ${isSubmitting ? "opacity-75 cursor-not-allowed" : "cursor-pointer"}`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <span className="absolute right-0 inset-y-0 flex items-center pr-3">
                    <FiArrowRight className="h-5 w-5 text-neutral-400 dark:text-zinc-550 group-hover:translate-x-1 transition-transform" />
                  </span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Toggle View Link */}
        <div className="text-center mt-4">
          <button
            onClick={() => {
              navigate("/signUp");
            }}
            disabled={isSubmitting}
            className="text-sm font-medium text-neutral-600 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-zinc-200 transition-colors focus:outline-none underline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Don't have an account? Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
