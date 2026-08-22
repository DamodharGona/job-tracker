import { useState } from "react";
import { FaKey } from "react-icons/fa";
import { FiUser, FiMail, FiInfo } from "react-icons/fi";
import { IoCloseOutline as CloseIcon } from "react-icons/io5";

function SettingsModal({ isOpen, onClose, onSave, data, isPending }) {
  const [apiKey, setApiKey] = useState("");

  if (!isOpen) return null;

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!apiKey.trim()) return;
    onSave(apiKey.trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <form
        onSubmit={handleOnSubmit}
        className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 border border-transparent dark:border-zinc-800 p-6 text-left align-middle shadow-xl transition-all z-10 text-neutral-900 dark:text-zinc-100 transition-colors duration-200"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-neutral-400 hover:text-neutral-600 dark:hover:text-zinc-200 hover:bg-neutral-100 dark:hover:bg-zinc-800 transition-all cursor-pointer focus:outline-none"
        >
          <CloseIcon size={20} />
        </button>

        <h2 className="text-lg font-bold mb-5 text-neutral-900 dark:text-zinc-100">
          Account Settings
        </h2>

        {/* Profile Card */}
        <div className="flex flex-col items-center text-center pb-5 mb-5 border-b border-neutral-100 dark:border-zinc-800">
          <div className="h-16 w-16 rounded-full bg-neutral-900 text-white dark:bg-zinc-100 dark:text-zinc-900 flex items-center justify-center text-xl font-bold mb-3 shadow-sm">
            {data?.name?.charAt(0).toUpperCase() || <FiUser />}
          </div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-zinc-100">
            {data?.name}
          </h3>
          <p className="text-xs text-neutral-500 dark:text-zinc-400 flex items-center gap-1.5 mt-1">
            <FiMail className="w-3.5 h-3.5 text-neutral-400" />
            {data?.email}
          </p>
        </div>

        {/* API key section */}
        <div className="space-y-4">
          <div>
            <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-zinc-400">
              Gemini API Key
            </label>
            <p className="text-[11px] leading-relaxed text-neutral-500 dark:text-zinc-400 mb-3 flex items-start gap-1">
              <FiInfo className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-blue-500" />
              <span>
                Configure your Gemini API key to enable resume keyword matching.
                Stored securely using encryption.
              </span>
            </p>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400 dark:text-zinc-500">
                <FaKey className="h-4 w-4" />
              </div>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder={
                  data.hasGeminiApiKey
                    ? "Enter new key to replace existing key"
                    : "Enter Gemini API key"
                }
                className="w-full pl-10 pr-10 py-2.5 placeholder-neutral-400 dark:placeholder-zinc-650 border border-neutral-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-neutral-900 dark:text-zinc-100 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-zinc-350 focus:border-neutral-900 dark:focus:border-zinc-350 text-sm transition-all"
                disabled={isPending}
              />
            </div>
          </div>

          <div className="flex gap-x-3 pt-2">
            <button
              type="button"
              disabled={isPending}
              onClick={onClose}
              className={`w-full flex justify-center py-2 px-4 border border-neutral-300 dark:border-zinc-700 text-sm font-semibold rounded-md text-neutral-700 dark:text-zinc-300 hover:bg-neutral-100 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-colors ${isPending ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending || !apiKey.trim()}
              className={`w-full flex justify-center items-center py-2 px-4 border border-transparent text-sm font-semibold rounded-md text-white dark:text-zinc-900 bg-neutral-900 hover:bg-neutral-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 transition-colors dark:focus:ring-zinc-100 dark:focus:ring-offset-zinc-950 ${isPending || !apiKey.trim() ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
            >
              {isPending ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Saving...
                </>
              ) : (
                "Save Key"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SettingsModal;
