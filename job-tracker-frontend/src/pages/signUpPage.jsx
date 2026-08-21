import { AuthContext } from "@/components/app/authContext";
import { registerUser } from "@/repository/authApis";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import { MdPerson } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { setUser, setIsAuthenticated } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      console.log("Registration successful:", response);
      localStorage.setItem("user", JSON.stringify(response.user));

      setUser(response.user);
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-zinc-950 px-4 py-12 sm:px-6 lg:px-8 font-sans transition-colors duration-200">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-zinc-900 p-8 border border-neutral-200 dark:border-zinc-800 rounded-lg shadow-sm transition-colors duration-200">
        {/* Header */}
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-neutral-500 dark:text-zinc-400">
            Start tracking your jobs with a monochrome view.
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-zinc-400 mb-1"
              >
                Enter Your Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400 dark:text-zinc-550">
                  <MdPerson className="h-5 w-5" />
                </div>
                <input
                  id="name"
                  {...register("name", {
                    required: "name is required",
                    minLength: {
                      value: 3,
                      message: "Name must be at least 3 characters",
                    },
                  })}
                  type="text"
                  autoComplete="text"
                  className="block w-full pl-10 pr-10 py-2.5 border border-neutral-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-neutral-900 dark:text-zinc-100 placeholder-neutral-400 dark:placeholder-zinc-500 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-zinc-350 focus:border-neutral-900 dark:focus:border-zinc-350 text-sm transition-all"
                  placeholder="Rahul kumar"
                />
              </div>
              {errors.name?.message && (
                <p className="text-red-400">{errors.name.message}</p>
              )}
            </div>

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
                  {...register("email", {
                    required: "email is required",
                    pattern: {
                      value: /^[a-z0-9.]+@gmail\.com$/i,
                      message: "Enter a valid email address",
                    },
                  })}
                  type="email"
                  autoComplete="email"
                  className="block w-full pl-10 pr-3 py-2.5 border border-neutral-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-neutral-900 dark:text-zinc-100 placeholder-neutral-400 dark:placeholder-zinc-500 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-zinc-350 focus:border-neutral-900 dark:focus:border-zinc-350 text-sm transition-all"
                  placeholder="name@example.com"
                />
              </div>
              {errors.email?.message && (
                <p className="text-red-400">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-zinc-400 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400 dark:text-zinc-550">
                  <FiLock className="h-5 w-5" />
                </div>
                <input
                  id="password"
                  {...register("password", {
                    required: "password is required",
                    minLength: 8,
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
                      message:
                        "Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  className="block w-full pl-10 pr-10 py-2.5 border border-neutral-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-neutral-900 dark:text-zinc-100 placeholder-neutral-400 dark:placeholder-zinc-550 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-zinc-350 focus:border-neutral-900 dark:focus:border-zinc-350 text-sm transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 dark:text-zinc-500 hover:text-neutral-600 dark:hover:text-zinc-300 transition-colors"
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

          {/* Terms Agreement */}
          <div className="flex items-center">
            <input
              id="agree-terms"
              {...register("agree-terms", { required: "agree to the terms" })}
              type="checkbox"
              className="h-4 w-4 text-neutral-900 dark:text-zinc-100 border-neutral-300 dark:border-zinc-700 rounded focus:ring-neutral-900 dark:focus:ring-zinc-350 accent-neutral-900 dark:accent-zinc-100"
            />
            <label
              htmlFor="agree-terms"
              className="ml-2 block text-sm text-neutral-600 dark:text-zinc-400"
            >
              I agree to the{" "}
              <a
                href="#"
                className="font-semibold text-neutral-900 dark:text-zinc-200 underline hover:text-neutral-700 dark:hover:text-zinc-100 transition-colors"
              >
                Terms of Service
              </a>
            </label>
          </div>
          {errors["agree-terms"]?.message && (
            <p className="text-red-400">{errors["agree-terms"].message}</p>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-semibold rounded-md text-white dark:text-zinc-900 bg-neutral-900 hover:bg-neutral-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 dark:focus:ring-zinc-300 transition-colors cursor-pointer dark:focus:ring-zinc-100
    dark:focus:ring-offset-zinc-950"
            >
              Sign Up
              <span className="absolute right-0 inset-y-0 flex items-center pr-3">
                <FiArrowRight className="h-5 w-5 text-neutral-400 dark:text-zinc-900 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </form>

        {/* Toggle View Link */}
        <div className="text-center mt-4">
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="text-sm font-medium text-neutral-600 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-zinc-200 transition-colors focus:outline-none underline cursor-pointer"
          >
            Already have an account? Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
