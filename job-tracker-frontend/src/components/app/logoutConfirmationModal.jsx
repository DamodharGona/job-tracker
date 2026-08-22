import { FiLogOut } from "react-icons/fi";
import { IoCloseOutline as CloseIcon } from "react-icons/io5";

function LogoutConfirmationModal({ isOpen, onClose, onConfirm, isPending }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="relative w-full max-w-sm transform overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 border border-transparent dark:border-zinc-800 p-6 text-center align-middle shadow-xl transition-all z-10 text-neutral-900 dark:text-zinc-100 transition-colors duration-200">
        <button
          type="button"
          onClick={onClose}
          disabled={isPending}
          className="absolute top-4 right-4 p-1.5 rounded-full text-neutral-400 hover:text-neutral-600 dark:hover:text-zinc-200 hover:bg-neutral-100 dark:hover:bg-zinc-800 transition-all cursor-pointer focus:outline-none"
        >
          <CloseIcon size={20} />
        </button>

        {/* Logout Icon Header */}
        <div className="flex flex-col items-center mb-2">
          <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center justify-center text-xl mb-3 shadow-sm">
            <FiLogOut className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-zinc-100">
            Confirm Logout
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-zinc-400 mt-2 max-w-xs">
            Are you sure you want to log out of your account?
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-x-3 mt-6">
          <button
            type="button"
            disabled={isPending}
            onClick={onClose}
            className={`w-full flex justify-center py-2 px-4 border border-neutral-300 dark:border-zinc-700 text-xs sm:text-sm font-semibold rounded-md text-neutral-700 dark:text-zinc-300 hover:bg-neutral-100 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:border-neutral-900 transition-colors ${isPending ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isPending}
            onClick={onConfirm}
            className={`w-full flex justify-center items-center py-2 px-4 border border-transparent text-xs sm:text-sm font-semibold rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors ${isPending ? "opacity-75 cursor-not-allowed" : "cursor-pointer"}`}
          >
            {isPending ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Logging out...
              </>
            ) : (
              "Logout"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutConfirmationModal;
