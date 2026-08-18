import { formatDate } from "@/utils/date";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

export function ApplicationAccordion({
  id,
  companyName,
  jobTitle,
  salaryRange,
  location,
  stage,
  mode,
  status,
  dueDate,
  handleEdit,
  handleDelete,
}) {
  return (
    <AccordionItem value={id} className="mb-2">
      <div className="relative">
        <AccordionTrigger className="flex flex-col border border-neutral-300 dark:border-zinc-800 pt-2 px-2 bg-white dark:bg-zinc-900 hover:bg-neutral-100 dark:hover:bg-zinc-800/50 focus:border-neutral-900 dark:focus:border-zinc-300 focus:ring-2 text-left rounded-md transition-colors duration-200">
          <div className="flex flex-col sm:flex-row gap-x-3">
            <span className="font-semibold text-base text-neutral-900 dark:text-zinc-100">
              {companyName}
            </span>
            <span
              className={` hidden sm:block rounded-full px-1.5 py-1 h-fit text-xs font-semibold ${
                status === "completed"
                  ? "bg-green-100 dark:bg-green-950/40 text-green-800 dark:text-green-300"
                  : status === "pending"
                    ? "bg-yellow-100 dark:bg-yellow-950/40 text-yellow-800 dark:text-yellow-300"
                    : status === "shortlisted"
                      ? "bg-blue-100 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300"
                      : status === "rejected"
                        ? "bg-red-100 dark:bg-red-950/40 text-red-800 dark:text-red-300"
                        : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
              } uppercase text-[10px] tracking-wider w-fit`}
            >
              {status}
            </span>
          </div>
          <span className="font-normal text-sm text-neutral-600 dark:text-zinc-300">
            {jobTitle}
          </span>
          <section className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:flex-wrap">
            <div className="flex items-center text-xs text-neutral-500 dark:text-zinc-400 mt-1">
              <span>{location}</span>
              <span
                className={`${mode === "online" ? "text-green-600 dark:text-green-400" : "text-neutral-500 dark:text-zinc-550"} px-1`}
              >
                •
              </span>
              <span className="uppercase">{mode}</span>
              <span className="px-1">•</span>
              <span>{formatDate(dueDate)}</span>
            </div>
            <span
              className={`rounded-full mt-1 sm:hidden sm:mt-0 px-1.5 py-0.5 text-xs font-semibold ${
                status === "completed"
                  ? "bg-green-100 dark:bg-green-950/40 text-green-800 dark:text-green-300"
                  : status === "pending"
                    ? "bg-yellow-100 dark:bg-yellow-950/40 text-yellow-800 dark:text-yellow-300"
                    : status === "shortlisted"
                      ? "bg-blue-100 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300"
                      : status === "rejected"
                        ? "bg-red-100 dark:bg-red-950/40 text-red-800 dark:text-red-300"
                        : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
              } uppercase text-[10px] tracking-wider w-fit`}
            >
              {status}
            </span>
          </section>
        </AccordionTrigger>
        <div className="absolute top-0 right-0 flex gap-x-3 text-lg sm:text-xl p-2 z-10">
          <button
            className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleEdit({
                id,
                companyName,
                jobTitle,
                salaryRange,
                location,
                stage,
                mode,
                status,
                dueDate,
              });
            }}
          >
            <FaEdit />
          </button>

          <button
            className="hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete({
                id,
                companyName,
                jobTitle,
                salaryRange,
                location,
                stage,
                mode,
                status,
                dueDate,
              });
            }}
          >
            <RiDeleteBin6Line />
          </button>
        </div>
      </div>
      <AccordionContent className="flex flex-col pl-3 pr-3 pt-2 pb-3 bg-neutral-50/50 dark:bg-zinc-900/40 text-neutral-700 dark:text-zinc-300 border-x border-b border-neutral-300 dark:border-zinc-800 rounded-b-md -mt-1 transition-colors duration-200">
        <div className="flex gap-x-2 py-0.5">
          <span className="font-medium text-neutral-500 dark:text-zinc-400">
            Salary Range:
          </span>
          <span>{salaryRange}</span>
        </div>
        <div className="flex gap-x-2 py-0.5">
          <span className="font-medium text-neutral-500 dark:text-zinc-400">
            Stage:
          </span>
          <span>{stage}</span>
        </div>
        <div className="flex gap-x-2 py-0.5">
          <span className="font-medium text-neutral-500 dark:text-zinc-400">
            Mode:
          </span>
          <span className="uppercase">{mode}</span>
        </div>
        <div className="flex gap-x-2 py-0.5">
          <span className="font-medium text-neutral-500 dark:text-zinc-400">
            Due date:
          </span>
          <span>{formatDate(dueDate)}</span>
        </div>
        <div className="flex gap-x-2 py-0.5">
          <span className="font-medium text-neutral-500 dark:text-zinc-400">
            Status:
          </span>
          <span className="uppercase">{status}</span>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
