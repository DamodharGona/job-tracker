import { Controller, useForm } from "react-hook-form";
import {
  FiBriefcase,
  FiCalendar,
  FiCheckCircle,
  FiCode,
  FiDollarSign,
  FiFlag,
  FiMapPin,
  FiMonitor,
} from "react-icons/fi";

import { useEffect } from "react";
import SelectComponent from "./select";
import DatePicker from "./datePicker";

function ApplicationModal({
  isOpen,
  onClose,
  onConfirm,
  rowData,
  isEdit,
  onEditConfirm,
  isPending,
}) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      companyName: "",
      jobTitle: "",
      salaryRange: "",
      location: "",
      stage: "",
      status: "",
      mode: "",
      dueDate: "",
    },
  });

  useEffect(() => {
    if (isEdit && rowData) {
      reset({
        companyName: rowData.companyName ?? "",
        jobTitle: rowData.jobTitle ?? "",
        salaryRange: rowData.salaryRange ?? "",
        location: rowData.location ?? "",
        stage: rowData.stage ?? "",
        status: rowData.status ?? "",
        mode: rowData.mode ?? "",
        dueDate: rowData.dueDate ?? "",
      });
    } else {
      reset({
        companyName: "",
        jobTitle: "",
        salaryRange: "",
        location: "",
        stage: "",
        status: "",
        mode: "",
        dueDate: "",
      });
    }
  }, [isEdit, rowData, reset]);

  console.log("react-hook-form errors: ", errors);

  if (!isOpen) return null;

  const statuses = [
    { id: 1, value: "", label: "Not selected" },
    { id: 2, value: "pending", label: "pending" },
    { id: 3, value: "completed", label: "completed" },
    { id: 4, value: "shortlisted", label: "shortlisted" },
    { id: 5, value: "rejected", label: "rejected" },
  ];
  const modes = [
    { id: 1, value: "", label: "Not selected" },
    { id: 2, value: "online", label: "online" },
    { id: 3, value: "offline", label: "offline" },
  ];

  const stages = [
    { id: 1, value: "", label: "Not selected" },
    { id: 2, value: "Test", label: "Test" },
    { id: 3, value: "Assignment", label: "Assignment" },
    { id: 4, value: "Interview", label: "Interview" },
  ];

  const handleOnCancelForm = () => {
    onClose();
    reset();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />

      <form
        onSubmit={handleSubmit((data) => {
          console.log("application form submitted: ", data);
          if (isEdit) {
            onEditConfirm({ id: rowData.id, ...data });
            reset();
          } else {
            onConfirm(data);
            reset();
          }
        })}
        className="relative w-full max-w-lg transform overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 border border-transparent dark:border-zinc-800 p-6 text-left align-middle shadow-xl transition-all z-10 text-neutral-900 dark:text-zinc-100 transition-colors duration-200"
      >
        <div className="flex flex-col w-full gap-y-3 py-2">
          <label className="block -mb-1 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-zinc-400">
            Company Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400 dark:text-zinc-500">
              <FiBriefcase className="h-5 w-5" />
            </div>
            <input
              {...register("companyName", {
                required: "Company name is required",
                minLength: {
                  value: 3,
                  message: "Company name must be at least 3 characters",
                },
              })}
              placeholder="Amazon"
              className="w-full pl-10 pr-10 py-2.5 placeholder-neutral-400 dark:placeholder-zinc-550 border border-neutral-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-neutral-900 dark:text-zinc-100 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-zinc-350 focus:border-neutral-900 dark:focus:border-zinc-350 text-sm transition-all"
            />
          </div>
          {errors["companyName"]?.message && (
            <p className="text-red-400">{errors["companyName"].message}</p>
          )}

          <label className="block -mb-1 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-zinc-400">
            Job Title
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400 dark:text-zinc-500">
              <FiCode className="h-5 w-5" />
            </div>
            <input
              {...register("jobTitle", {
                required: "jobTitle is required",
                minLength: {
                  value: 3,
                  message: "Job Title must be at least 3 characters",
                },
              })}
              placeholder="software developer"
              className="w-full pl-10 pr-10 py-2.5 placeholder-neutral-400 dark:placeholder-zinc-550 border border-neutral-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-neutral-900 dark:text-zinc-100 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-zinc-350 focus:border-neutral-900 dark:focus:border-zinc-350 text-sm transition-all"
            />
          </div>
          {errors["jobTitle"]?.message && (
            <p className="text-red-400">{errors["jobTitle"].message}</p>
          )}

          <div className="flex flex-col gap-2 sm:flex-row sm:gap-x-5">
            <div className="flex flex-col flex-1 min-w-0">
              <label className="mb-1 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-zinc-400">
                Salary Range
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400 dark:text-zinc-500">
                  <FiDollarSign className="h-5 w-5" />
                </div>
                <input
                  {...register("salaryRange", {
                    required: "salary range is required",
                  })}
                  placeholder="30-40LPA"
                  className="w-full pl-10 pr-10 py-2.5 placeholder-neutral-400 dark:placeholder-zinc-550 border border-neutral-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-neutral-900 dark:text-zinc-100 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-zinc-350 focus:border-neutral-900 dark:focus:border-zinc-350 text-sm transition-all"
                />
              </div>
              {errors["salaryRange"]?.message && (
                <p className="text-red-400">{errors["salaryRange"].message}</p>
              )}
            </div>

            <div className="flex flex-col flex-1 min-w-0">
              <label className="mb-1 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-zinc-400">
                Location
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400 dark:text-zinc-500">
                  <FiMapPin className="h-5 w-5" />
                </div>
                <input
                  {...register("location", {
                    required: "location is required",
                  })}
                  placeholder="Bengaluru"
                  className="w-full pl-10 pr-10 py-2.5 border placeholder-neutral-400 dark:placeholder-zinc-550 border-neutral-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-neutral-900 dark:text-zinc-100 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-zinc-350 focus:border-neutral-900 dark:focus:border-zinc-350 text-sm transition-all"
                />
              </div>
              {errors["location"]?.message && (
                <p className="text-red-400">{errors["location"].message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:gap-x-5">
            <Controller
              name="stage"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col flex-1 min-w-0">
                  <label
                    htmlFor="stage-dropdown"
                    className="mb-1 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-zinc-400"
                  >
                    Stage
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400 dark:text-zinc-500">
                      <FiFlag className="h-5 w-5" />
                    </div>
                    <SelectComponent
                      value={field.value}
                      labelName="stages"
                      placeholder="select current stage"
                      onChange={field.onChange}
                      options={stages}
                    />
                  </div>
                </div>
              )}
            />

            <div className="flex flex-col flex-1 min-w-0">
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col flex-1 min-w-0">
                    <label
                      htmlFor="status-dropdown"
                      className="mb-1 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-zinc-400"
                    >
                      Status
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400 dark:text-zinc-500">
                        <FiCheckCircle className="h-5 w-5" />
                      </div>
                      <SelectComponent
                        value={field.value}
                        labelName="statuses"
                        placeholder="select current status"
                        onChange={field.onChange}
                        options={statuses}
                      />
                    </div>
                  </div>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:gap-x-5">
            <div className="flex flex-col flex-1 min-w-0">
              <Controller
                name="mode"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col flex-1 min-w-0">
                    <label
                      htmlFor="mode-dropdown"
                      className="mb-1 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-zinc-400"
                    >
                      Mode
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400 dark:text-zinc-500">
                        <FiMonitor className="h-5 w-5" />
                      </div>
                      <SelectComponent
                        value={field.value}
                        labelName="modes"
                        placeholder="select current mode"
                        onChange={field.onChange}
                        options={modes}
                      />
                    </div>
                  </div>
                )}
              />
            </div>

            <div className="flex flex-col flex-1 min-w-0">
              <Controller
                name="dueDate"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col flex-1 min-w-0">
                    <label className="mb-1 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-zinc-400">
                      Due Date
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400 dark:text-zinc-500">
                        <FiCalendar className="h-5 w-5" />
                      </div>
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </div>
                  </div>
                )}
              />
            </div>
          </div>

          <div className="flex mt-2 gap-x-4">
            <button
              type="button"
              disabled={isPending}
              className={`w-full flex justify-center py-2.5 px-4 border border-neutral-300 dark:border-zinc-700 text-sm font-semibold rounded-md text-neutral-700 dark:text-zinc-300 hover:bg-neutral-100 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:border-neutral-900 transition-colors ${isPending ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
              onClick={handleOnCancelForm}
            >
              cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className={`w-full flex justify-center items-center py-2.5 px-4 border border-transparent text-sm font-semibold rounded-md text-white dark:text-zinc-900 bg-neutral-900 hover:bg-neutral-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 transition-colors dark:focus:ring-zinc-100 dark:focus:ring-offset-zinc-950 ${isPending ? "opacity-75 cursor-not-allowed" : "cursor-pointer"}`}
            >
              {isPending ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Saving...
                </>
              ) : (
                "confirm"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ApplicationModal;
