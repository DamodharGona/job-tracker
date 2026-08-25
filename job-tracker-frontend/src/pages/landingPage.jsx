import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiBriefcase, FiHome, FiTag, FiSun, FiArrowRight } from "react-icons/fi";
import { LuMoonStar } from "react-icons/lu";
import logo from "../assets/logo.png";

function LandingPage() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const features = [
    {
      icon: <FiBriefcase className="h-5 w-5 text-neutral-800 dark:text-zinc-200" />,
      title: "Applications Tracking",
      description: "Track every application's status, stage, and timeline in one place.",
    },
    {
      icon: <FiHome className="h-5 w-5 text-neutral-800 dark:text-zinc-200" />,
      title: "Dashboard Insights",
      description: "See your pipeline at a glance — pending, shortlisted, and success rate.",
    },
    {
      icon: <FiTag className="h-5 w-5 text-neutral-800 dark:text-zinc-200" />,
      title: "AI Resume Match",
      description: "Upload your resume and a job description to instantly find keyword gaps and get tailored improvements.",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-zinc-950 text-neutral-900 dark:text-zinc-100 font-sans transition-colors duration-200 flex flex-col">
      {/* Header */}
      <header className="w-full bg-white dark:bg-zinc-900 border-b border-transparent dark:border-zinc-800 shadow-[0_1px_7px_-5px_rgba(0,0,0,0.3)] transition-colors duration-200">
        <div className="mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-12 w-auto dark:invert" />
            <span className="text-base font-bold tracking-tight">JobTracker</span>
          </div>

          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="p-2 rounded-full border border-neutral-200 dark:border-zinc-800 hover:bg-neutral-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer text-neutral-500 dark:text-zinc-400 focus:outline-none"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? <LuMoonStar size={16} /> : <FiSun size={16} />}
          </button>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="max-w-4xl mx-auto w-full px-6 py-12 flex-1 flex flex-col justify-center items-center text-center">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-neutral-900 dark:text-white leading-tight">
          Streamline Your Job Search
        </h1>
        <p className="text-sm sm:text-base text-neutral-500 dark:text-zinc-400 max-w-2xl mb-8 leading-relaxed">
          Track job applications, analyze resume-JD match, and manage your job search in one place.
        </p>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16 w-full sm:w-auto">
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 py-2.5 px-6 text-sm font-semibold rounded-md text-white dark:text-zinc-900 bg-neutral-900 hover:bg-neutral-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 transition-colors shadow-sm focus:outline-none"
          >
            Get Started
            <FiArrowRight />
          </Link>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
          {features.map((feature, i) => (
            <div
              key={i}
              className="p-6 bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 rounded-xl shadow-sm transition-colors duration-200"
            >
              <div className="h-10 w-10 rounded-lg bg-neutral-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-zinc-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* Mini Footer */}
      <footer className="w-full text-center py-6 border-t border-neutral-100 dark:border-zinc-900 text-[10px] sm:text-xs text-neutral-400 dark:text-zinc-500">
        &copy; {new Date().getFullYear()} JobTracker. All rights reserved.
      </footer>
    </div>
  );
}

export default LandingPage;
