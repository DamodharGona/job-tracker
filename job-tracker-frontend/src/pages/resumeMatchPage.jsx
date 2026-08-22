import { AuthContext } from "@/components/app/authContext";
import { getJdKeyWordsMatcher } from "@/repository/applicationApis";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FiArrowUp, FiLoader } from "react-icons/fi";
import { IoMdMenu } from "react-icons/io";
import { useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { Accordion } from "../components/ui/accordion";
import { BulletPointAccordion } from "../components/app/bulletPointAccordion";

export function ResumeMatchPage() {
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useContext(AuthContext);
  const [geminiResponse, setGeminiResponse] = useState({
    keywords: [],
    tailored_bullets: [],
    advisory_note: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const emptyGeminiResponse = {
    keywords: [],
    tailored_bullets: [],
    advisory_note: "",
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const resumeFile = watch("resume");
  const fileName = resumeFile?.[0]?.name;

  const { onSideBarClick } = useOutletContext();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setGeminiResponse(emptyGeminiResponse);
    try {
      if (geminiResponse.length > 0) {
        setGeminiResponse("");
      }

      const formData = new FormData();

      formData.append("resume", data.resume[0]);
      formData.append("jobDescription", data.jobDescription);

      const response = await getJdKeyWordsMatcher(formData);
      const parsedResult =
        typeof response.result === "string"
          ? JSON.parse(response.result)
          : response.result;

      setGeminiResponse(parsedResult);
    } catch (error) {
      console.error(
        "error while calling gemini",
        error.response?.data?.error?.message,
      );

      if (error.response?.status === 401 || error.response?.status === 403) {
        setUser(null);
        setIsAuthenticated(false);
        navigate("/login", { replace: true });
        return;
      }

      const message =
        error.response?.data?.error?.message ||
        error.response?.data?.message ||
        "Failed to call Gemini";

      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col bg-neutral-50 dark:bg-zinc-950 text-neutral-900 dark:text-zinc-100 transition-colors duration-200">
      <div className="flex min-h-20 items-center justify-between bg-white dark:bg-zinc-900 px-2 py-2 border-b border-transparent dark:border-zinc-800 shadow-[0_1px_7px_-5px_rgba(0,0,0,0.3)] transition-colors duration-200">
        <button
          type="button"
          onClick={onSideBarClick}
          className="text-lg md:text-xl lg:hidden"
        >
          <IoMdMenu />
        </button>

        <p className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-zinc-100">
          Resume Match
        </p>
      </div>

      <div className="flex flex-col p-5 lg:p-10 overflow-y-auto overscroll-y-none bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 m-4 lg:m-8 rounded-md shadow-sm transition-colors duration-200">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <h2 className="font-semibold">Upload your resume</h2>
          <label className="flex items-center justify-between rounded-md border border-dashed border-neutral-300 dark:border-zinc-700 bg-neutral-50 dark:bg-zinc-800/40 p-4 cursor-pointer hover:border-neutral-500 dark:hover:border-zinc-500 transition-colors duration-200">
            <span className="text-neutral-600 dark:text-zinc-350 min-w-0 flex-1 truncate">
              {fileName || "Click to upload your resume (PDF)"}
            </span>
            <span className="lg:text-sm text-blue-600 dark:text-blue-400 font-medium">
              Browse
            </span>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              {...register("resume", { required: "Resume is required" })}
            />
          </label>

          {errors.resume?.message && (
            <p className="text-red-400">{errors.resume.message}</p>
          )}
          <h2 className="font-semibold">Enter or Paste the Job Description</h2>
          <div className="relative p-2 rounded-md border border-neutral-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus-within:border-neutral-900 dark:focus-within:border-zinc-300 focus-within:ring-2">
            <textarea
              placeholder="Enter the job description"
              {...register("jobDescription", {
                required: "Job description is required",
                minLength: {
                  value: 20,
                  message:
                    "Job description must contain at least 20 characters",
                },
              })}
              className="outline-none max-height-200 resize-none w-full mr-10 text-neutral-600 dark:text-zinc-200 bg-transparent"
            />
            <button
              type="submit"
              className="absolute right-2 bottom-2 bg-neutral-800 hover:bg-neutral-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 text-white rounded-md p-2 hover:cursor-pointer transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <FiLoader className="animate-spin" />
              ) : (
                <FiArrowUp />
              )}
            </button>
          </div>

          {errors.jobDescription?.message && (
            <p className="text-red-400">{errors.jobDescription.message}</p>
          )}
        </form>

        {isLoading && (
          <div className="mt-6 space-y-4 animate-pulse">
            <div className="h-6 w-40 bg-neutral-200 dark:bg-zinc-800 rounded" />
            <div className="h-24 bg-neutral-200 dark:bg-zinc-800 rounded" />
            <div className="h-6 w-48 bg-neutral-200 dark:bg-zinc-800 rounded" />
            <div className="h-40 bg-neutral-200 dark:bg-zinc-800 rounded" />
          </div>
        )}

        {geminiResponse.keywords.length > 0 && (
          <div className="mt-6 flex flex-col gap-6 bg-neutral-50 dark:bg-zinc-950/50 border border-neutral-200 dark:border-zinc-800 rounded-lg p-4 sm:p-6 transition-colors duration-200">
            <section className="rounded-md border border-neutral-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-sm md:text-lg font-semibold text-neutral-800 dark:text-zinc-200">
                  Match Score
                </h2>
                <span
                  className={`text-2xl font-bold ${
                    geminiResponse.matchScore >= 70
                      ? "text-green-600 dark:text-green-400"
                      : geminiResponse.matchScore >= 40
                        ? "text-yellow-600 dark:text-yellow-400"
                        : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {geminiResponse.matchScore}
                  <span className="text-base text-neutral-400 dark:text-zinc-500">
                    /100
                  </span>
                </span>
              </div>

              <div className="mt-3 h-2 w-full rounded-full bg-neutral-100 dark:bg-zinc-800 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    geminiResponse.matchScore >= 70
                      ? "bg-green-500"
                      : geminiResponse.matchScore >= 40
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  }`}
                  style={{ width: `${geminiResponse.matchScore}%` }}
                />
              </div>

              <p className="mt-2 text-sm text-neutral-500 dark:text-zinc-400">
                {geminiResponse.matchBreakdown}
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-sm md:text-xl lg:text-lg font-semibold">
                Important Keywords
              </h2>

              <ol className="list-decimal space-y-2 rounded-md border border-neutral-300 dark:border-zinc-800 p-5 pl-7 sm:pl-10 bg-white dark:bg-zinc-900 transition-colors duration-200">
                {geminiResponse.keywords.map((item) => (
                  <li key={item.keyword}>
                    <span className="font-medium">{item.keyword}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section>
              <h2 className="mb-2 text-sm md:text-xl lg:text-lg font-semibold">
                Tailored Resume Bullets
              </h2>

              <div className="hidden md:block overflow-x-auto rounded-md border border-neutral-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-colors duration-200">
                <div className="grid min-w-[700px] grid-cols-2">
                  <div className="border-r border-neutral-300 dark:border-zinc-800 p-3 font-semibold text-neutral-800 dark:text-zinc-200 bg-neutral-50 dark:bg-zinc-900">
                    Suggested bullet
                  </div>

                  <div className="p-3 font-semibold text-neutral-800 dark:text-zinc-200 bg-neutral-50 dark:bg-zinc-900">
                    Original bullet
                  </div>

                  {geminiResponse.tailored_bullets.map((item, index) => (
                    <div
                      key={`${item.bullet_line}-${index}`}
                      className="contents"
                    >
                      <div className="border-r border-t border-neutral-300 dark:border-zinc-800 p-3 text-neutral-700 dark:text-zinc-300">
                        {item.bullet_line}
                      </div>

                      <div className="border-t border-neutral-300 dark:border-zinc-800 p-3 text-neutral-500 dark:text-zinc-400">
                        {item.source_line}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:hidden">
                <Accordion type="single" collapsible>
                  {geminiResponse.tailored_bullets.map((item, index) => (
                    <BulletPointAccordion
                      id={index}
                      key={index}
                      bulletLine={item.bullet_line}
                      sourceLine={item.source_line}
                    />
                  ))}
                </Accordion>
              </div>
            </section>

            <section>
              <h2 className="mb-2 text-sm md:text-xl lg:text-lg font-semibold">
                Advisory Note
              </h2>

              <div className="rounded-md border border-neutral-300 dark:border-zinc-800 p-3 bg-white dark:bg-zinc-900 text-neutral-700 dark:text-zinc-300 transition-colors duration-200">
                <p>{geminiResponse.advisory_note}</p>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
