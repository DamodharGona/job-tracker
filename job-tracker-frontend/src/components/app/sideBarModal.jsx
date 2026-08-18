import { FiBriefcase, FiHome, FiLogOut, FiSun, FiTag } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { LuMoonStar } from "react-icons/lu";

function SideBarModal({
  isSideBarOpen,
  onClose,
  onLogoutClicked,
  theme,
  setTheme,
}) {
  if (!isSideBarOpen) return null;

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-y-0 left-0 z-50 flex justify-start lg:hidden">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />
      <div className="z-10 relative h-screen min-w-40 md:min-w-50 bg-white dark:bg-zinc-900 border-r border-transparent dark:border-zinc-800 text-neutral-900 dark:text-zinc-100 flex flex-col items-start transition-colors duration-200">
        <img src={logo} alt="Company Logo" className="max-w-20 mt-5" />
        <button
          onClick={handleClose}
          className="absolute top-0 right-0 pr-2 pt-2 text-neutral-500 dark:text-zinc-400 hover:text-neutral-800 dark:hover:text-zinc-100 transition-colors"
        >
          <MdOutlineClose />
        </button>
        <div className="flex flex-col gap-y-2 mt-3 mx-5 w-40 md:w-50">
          <Link to="dashboard">
            <span
              onClick={handleClose}
              className="flex gap-x-2 items-center text-sm uppercase tracking-wider cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 rounded-md hover:font-semibold px-2 py-1 md:px-3 md:py-1.5 transition-colors"
            >
              <FiHome />
              Dashboard
            </span>
          </Link>
          <Link to="jobs">
            <span
              onClick={handleClose}
              className="flex gap-x-2 items-center text-sm uppercase tracking-wider cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 rounded-md hover:font-semibold px-2 py-1 md:px-3 md:py-1.5 transition-colors"
            >
              <FiBriefcase />
              Jobs
            </span>
          </Link>
          <Link to="job-keyword">
            <span
              onClick={handleClose}
              className="flex w-full gap-x-2 items-center text-sm uppercase tracking-wider cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 rounded-md hover:font-semibold px-2 py-1 md:px-3 md:py-1.5 transition-colors"
            >
              <FiTag />
              resume-match
            </span>
          </Link>

          <div className="border border-transparent rounded-md bg-black/10 dark:bg-white/10 flex p-0.5 transition-colors">
            <span
              onClick={() => setTheme("light")}
              className={`hover:cursor-pointer w-full flex gap-x-2 py-1 rounded-md items-center justify-center px-2 transition-colors ${theme === "light" ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-900 dark:text-zinc-400 dark:hover:text-zinc-200"}`}
            >
              <FiSun />
            </span>
            <span
              onClick={() => setTheme("dark")}
              className={`hover:cursor-pointer w-full flex gap-x-2 py-1 rounded-md items-center justify-center px-2 transition-colors ${theme === "dark" ? "bg-zinc-800 text-white shadow-sm" : "text-neutral-500 hover:text-neutral-900 dark:text-zinc-400 dark:hover:text-zinc-200"}`}
            >
              <LuMoonStar />
            </span>
          </div>

          <span
            onClick={onLogoutClicked}
            className="flex gap-x-2 items-center text-sm uppercase tracking-wider cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 rounded-md hover:font-semibold px-2 py-1 md:px-3 md:py-1.5 transition-colors"
          >
            <FiLogOut />
            Logout
          </span>
        </div>
      </div>
    </div>
  );
}
export default SideBarModal;
