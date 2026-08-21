import { useContext, useEffect, useState } from "react";

import { logoutUser } from "../repository/applicationApis";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { FiBriefcase, FiHome, FiLogOut, FiSun, FiTag } from "react-icons/fi";

import "react-toastify/dist/ReactToastify.css";
import SideBarModal from "../components/app/sideBarModal";
import logo from "../assets/logo.png";
import { LuMoonStar } from "react-icons/lu";
import { AuthContext } from "@/components/app/authContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function HomePage() {
  const [isSideBarModalOpen, setIsSideBarModalOpen] = useState(false);
  const { user, setUser, setIsAuthenticated } = useContext(AuthContext);
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

  const navigate = useNavigate();

  const handleOnLogoutClick = async () => {
    try {
      await logoutUser();
      setUser(null);
      setIsAuthenticated(false);
      navigate("/login", { replace: true });
    } catch (e) {
      console.log(e);
    }
  };

  const handleMenuClick = () => {
    setIsSideBarModalOpen(true);
  };

  return (
    <>
      <main className="bg-white dark:bg-zinc-950 h-screen w-full flex flex-row font-sans text-neutral-900 dark:text-zinc-100 transition-colors duration-200">
        <div className="hidden lg:block h-screen min-w-50 lg:flex-col items-start bg-white dark:bg-zinc-900 border-r border-transparent dark:border-zinc-800 shadow-[1px_0_10px_-6px_rgba(0,0,0,0.3)]">
          <img
            src={logo}
            alt="Company Logo"
            className="max-w-20 mt-5 dark:invert"
          />
          <div className="flex flex-col gap-y-2 mx-5">
            <Link to="dashboard">
              <span className="flex gap-x-2 items-center text-sm uppercase tracking-wider cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 rounded-md hover:font-semibold pl-2 py-1.5 transition-colors">
                <FiHome />
                Dashboard
              </span>
            </Link>
            <Link to="jobs">
              <span className="flex gap-x-2 items-center text-sm uppercase tracking-wider cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 rounded-md hover:font-semibold pl-2 py-1.5  transition-colors">
                <FiBriefcase />
                Jobs
              </span>
            </Link>
            <Link to="job-keyword">
              <span className="flex gap-x-2 items-center text-sm uppercase tracking-wider cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 rounded-md hover:font-semibold pl-2 py-1.5  transition-colors">
                <FiTag />
                resume-match
              </span>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <section className="flex gap-x-2 items-center text-sm uppercase tracking-wider cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 rounded-md hover:font-semibold pl-2 py-1.5  transition-colors">
                  <span className="border rounded-full px-1 bg-blue-300 text-black">
                    {user?.name?.charAt(0)}
                  </span>
                  <span>{user?.name}</span>
                </section>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                <div className="border border-transparent rounded-md bg-black/10 dark:bg-white/10 flex p-0.5 transition-colors">
                  <span
                    onClick={() => setTheme("light")}
                    className={`hover:cursor-pointer flex gap-x-2 py-0.5 rounded-md items-center px-2 transition-colors ${theme === "light" ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-900 dark:text-zinc-400 dark:hover:text-zinc-200"}`}
                  >
                    <FiSun />
                    Light
                  </span>
                  <span
                    onClick={() => setTheme("dark")}
                    className={`hover:cursor-pointer flex gap-x-2 py-0.5 rounded-md items-center px-2 transition-colors ${theme === "dark" ? "bg-zinc-800 text-white shadow-sm" : "text-neutral-500 hover:text-neutral-900 dark:text-zinc-400 dark:hover:text-zinc-200"}`}
                  >
                    <LuMoonStar />
                    Dark
                  </span>
                </div>
                <span
                  onClick={handleOnLogoutClick}
                  className="flex w-full gap-x-2 items-center text-sm uppercase tracking-wider cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 rounded-md hover:font-semibold pl-2 py-1.5 mr-5 transition-colors"
                >
                  <FiLogOut />
                  Logout
                </span>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="flex flex-col w-full text-sm sm:text-base">
          <Outlet context={{ onSideBarClick: handleMenuClick }} />
        </div>
      </main>

      <SideBarModal
        isSideBarOpen={isSideBarModalOpen}
        onClose={() => setIsSideBarModalOpen(false)}
        onLogoutClicked={handleOnLogoutClick}
        theme={theme}
        setTheme={setTheme}
      />
    </>
  );
}

export default HomePage;
