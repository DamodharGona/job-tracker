import { AuthContext } from "@/components/app/authContext";
import { ApplicationAccordion } from "@/components/app/applicationAccordion";
import ApplicationModal from "@/components/app/applicationModal";
import { Table } from "@/components/app/table";
import { Accordion } from "@/components/ui/accordion";
import {
  createApplication,
  deleteApplication,
  getAllApplications,
  updateApplication,
} from "@/repository/applicationApis";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { FiArrowLeft, FiArrowRight, FiSearch } from "react-icons/fi";
import { IoMdMenu } from "react-icons/io";
import { useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { useDebounce } from "use-debounce";

function FullScreenLoader() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/40 border-t-white" />
    </div>
  );
}

function SmallTopLoader() {
  return (
    <div className="absolute top-0 left-0 h-1 w-full overflow-hidden bg-gray-200">
      <div className="h-full w-1/3 animate-[loading_1s_ease-in-out_infinite] bg-blue-600" />
    </div>
  );
}

const FILTER_STATUSES = [
  "All",
  "Pending",
  "Completed",
  "Shortlisted",
  "Rejected",
];

function JobApplication() {
  const { onSideBarClick } = useOutletContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [rowData, setRowData] = useState({});
  const [input, setInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openItemId, setOpenItemId] = useState(null);
  const itemsPerPage = 10;
  const { setUser, setIsAuthenticated } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const [debouncedValue] = useDebounce(input, 300);
  const debouncedSearchTerm = debouncedValue || "";

  const currentStatus = FILTER_STATUSES[selectedFilterIndex];

  const {
    data: queryResult,
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["queryResult", debouncedSearchTerm, currentPage, currentStatus],
    queryFn: async () => {
      const response = await getAllApplications(
        debouncedSearchTerm,
        currentStatus,
        currentPage,
        itemsPerPage,
        null,
      );

      if (response && response.applications) {
        return response;
      }

      return {
        applications: Array.isArray(response) ? response : [],
        meta: {
          currentPage: 1,
          totalPages: 1,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      };
    },

    placeholderData: (keepPreviousData) => keepPreviousData,
  });

  const hasNextPage = queryResult?.meta?.hasNextPage;
  const hasPrevPage = queryResult?.meta?.hasPreviousPage;

  const createMutation = useMutation({
    mutationFn: createApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["queryResult"],
      });

      setIsModalOpen(false);
      toast.success("created successfully");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to create application",
      );
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["queryResult"],
      });

      setIsModalOpen(false);
      setIsEdit(false);
      setRowData({});

      toast.success("updated successfully");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to update application",
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["queryResult"],
      });

      toast.success("deleted successfully");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to delete application",
      );
    },
  });
  const tableData = queryResult?.applications ?? [];

  useEffect(() => {
    if (!error) return;
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      setUser(null);
      setIsAuthenticated(false);
      navigate("/login", { replace: true });
    }
  }, [error, navigate, setUser, setIsAuthenticated]);

  const handleFilterChange = (index) => {
    setSelectedFilterIndex(index);
  };

  const handledOnAdd = () => {
    setIsModalOpen(true);
  };

  const handleModalConfirm = async (data) => {
    createMutation.mutate({
      companyName: data.companyName,
      jobTitle: data.jobTitle,
      salaryRange: data.salaryRange,
      location: data.location,
      stage: data.stage || undefined,
      mode: data.mode || undefined,
      dueDate: data.dueDate || undefined,
      status: data.status || undefined,
    });
  };

  const handleOnEdit = (data) => {
    setIsModalOpen(true);
    setIsEdit(true);
    setRowData(data);
  };

  const handleModalEditConfirm = async (data) => {
    updateMutation.mutate({
      id: data.id,
      companyName: data.companyName,
      jobTitle: data.jobTitle,
      salaryRange: data.salaryRange,
      location: data.location,
      stage: data.stage || undefined,
      mode: data.mode || undefined,
      dueDate: data.dueDate || undefined,
      status: data.status || undefined,
    });
  };

  const handleOnDelete = async (data) => {
    deleteMutation.mutate({
      id: data.id,
    });
  };
  const handleOnSearchInput = (e) => {
    const value = e.target.value;
    setInput(value);
  };

  const handleOnNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleOnPrevClick = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <div className="flex flex-col text-xs sm:text-sm h-full bg-neutral-50 dark:bg-zinc-950 text-neutral-900 dark:text-zinc-100 transition-colors duration-200">
        <div className="py-2 px-2 items-center flex justify-between shadow-[0_1px_7px_-5px_rgba(0,0,0,0.3)] bg-white dark:bg-zinc-900 border-b border-transparent dark:border-zinc-800 min-h-20 transition-colors duration-200">
          <button
            onClick={onSideBarClick}
            className="lg:hidden text-xl md:text-2xl"
          >
            <IoMdMenu />
          </button>
          <p className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-zinc-100">
            Applied jobs
          </p>
          <button
            className="flex h-fit justify-center py-1.5 px-2 sm:py-2.5 sm:px-4 border border-transparent text-xs sm:text-sm font-semibold rounded-md text-white dark:text-zinc-900 bg-neutral-900 hover:bg-neutral-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:focus:outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 transition-colors cursor-pointer dark:focus:ring-zinc-100
    dark:focus:ring-offset-zinc-950"
            onClick={() => handledOnAdd()}
          >
            Add Job
          </button>
        </div>
        {isLoading ? (
          <FullScreenLoader />
        ) : isError ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-red-500">Something went wrong...</p>
          </div>
        ) : (
          <>
            {isFetching && <SmallTopLoader />}
            {tableData == null || tableData.length === 0 ? (
              <div className="flex gap-y-2 flex-col items-center justify-center text-sm md:text-lg mt-30">
                <p>No applications found. Please add job applications</p>
                <button
                  onClick={() => handledOnAdd()}
                  className="flex justify-center py-2.5 px-4 border border-neutral-300 dark:border-zinc-700 text-sm font-semibold rounded-md text-neutral-700 dark:text-zinc-300 hover:bg-neutral-100 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:border-neutral-900 transition-colors cursor-pointer"
                >
                  Add job application
                </button>
              </div>
            ) : (
              <div className="flex flex-col p-3 sm:p-5 lg:p-10 text-xs sm:text-sm lg:text-base h-auto">
                <div className="bg-white dark:bg-zinc-900 shadow-sm rounded-md overflow-hidden transition-colors duration-200">
                  <div className="p-3 flex flex-col gap-y-2 overflow-x-auto sm:flex-row sm:justify-between">
                    <div className="border border-neutral-300 dark:border-zinc-700 text-xs lg:text-sm rounded-md flex w-max gap-1 p-0.5 bg-neutral-100 dark:bg-zinc-800 transition-colors duration-200">
                      {[
                        "All",
                        "Pending",
                        "Completed",
                        "Shortlisted",
                        "Rejected",
                      ].map((element, index) => {
                        return (
                          <button
                            key={index}
                            onClick={() => handleFilterChange(index)}
                            className={`whitespace-nowrap rounded-md px-2 py-1.5 text-xs sm:px-3 sm:py-2 sm:text-sm transition-colors ${selectedFilterIndex === index ? "bg-neutral-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm" : "text-neutral-600 hover:text-neutral-900 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-neutral-100 dark:hover:bg-zinc-700/50"}`}
                          >
                            {element}
                          </button>
                        );
                      })}
                    </div>

                    <div className="relative w-full sm:w-auto">
                      <div className="absolute inset-y-0 left-0 pl-3 pointer-events-none text-neutral-400 dark:text-zinc-500 flex items-center">
                        <FiSearch />
                      </div>
                      <input
                        value={input}
                        onChange={handleOnSearchInput}
                        className="w-full h-fit py-1.5 pl-10 pr-10 lg:py-2.5 border border-neutral-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-neutral-900 dark:text-zinc-100 placeholder-neutral-400 dark:placeholder-zinc-500 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-zinc-300 focus:border-neutral-900 dark:focus:border-zinc-300 text-sm transition-all"
                        placeholder="search"
                      />
                    </div>
                  </div>

                  <Table
                    applications={tableData}
                    handleEdit={(data) => handleOnEdit(data)}
                    handleDelete={(data) => handleOnDelete(data)}
                  />

                  <div className="lg:hidden px-3">
                    <Accordion
                      type="single"
                      collapsible
                      value={openItemId ?? ""}
                      onValueChange={setOpenItemId}
                      className="w-full"
                    >
                      {tableData.map((item) => {
                        const id = item.id;
                        return (
                          <ApplicationAccordion
                            key={id}
                            id={id}
                            companyName={item.companyName}
                            jobTitle={item.jobTitle}
                            salaryRange={item.salaryRange}
                            location={item.location}
                            stage={item.stage}
                            mode={item.mode}
                            status={item.status}
                            dueDate={item.dueDate}
                            handleEdit={(data) => handleOnEdit(data)}
                            handleDelete={(data) => handleOnDelete(data)}
                          />
                        );
                      })}
                    </Accordion>
                  </div>

                  <div
                    className={`${!hasNextPage && !hasPrevPage ? "hidden" : "p-3  flex flex-row items-center justify-between"}`}
                  >
                    <button
                      disabled={!hasPrevPage}
                      className={`${hasPrevPage ? "cursor-pointer hover:bg-neutral-800 dark:hover:bg-zinc-200 focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 transition-colors" : "cursor-not-allowed"} group relative border border-transparent pl-5 pr-2 py-1 sm:pl-8 sm:pr-4 sm:py-1.5 rounded-md flex items-center text-sm font-semibold text-white dark:text-zinc-900 bg-neutral-900 dark:bg-zinc-100 gap-x-2`}
                      onClick={handleOnPrevClick}
                    >
                      prev
                      <span className="absolute left-0 inset-y-0 flex items-center pl-1 sm:pl-3">
                        <FiArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 text-white dark:text-zinc-900 group-hover:-translate-x-1 transition-transform" />
                      </span>
                    </button>

                    <p className="bg-black dark:bg-zinc-800 rounded-md text-white px-2 py-2 sm:px-3 sm:py-2 text-center font-semibold">
                      {currentPage}
                    </p>

                    <button
                      disabled={!hasNextPage}
                      className={`${hasNextPage ? "cursor-pointer hover:bg-neutral-800 dark:hover:bg-zinc-200 focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 transition-colors" : "cursor-not-allowed"} group relative border border-transparent pr-5 pl-2 py-1 sm:pr-8 sm:pl-4 sm:py-1.5 rounded-md flex items-center text-sm font-semibold text-white dark:text-zinc-900 bg-neutral-900 dark:bg-zinc-100 gap-x-2 `}
                      onClick={handleOnNextClick}
                    >
                      next
                      <span className="absolute right-0 inset-y-0 flex items-center pr-1 sm:pr-3">
                        <FiArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-white dark:text-zinc-900 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleModalConfirm}
        rowData={rowData}
        isEdit={isEdit}
        onEditConfirm={handleModalEditConfirm}
        isPending={createMutation.isPending || updateMutation.isPending}
      />
    </>
  );
}
export default JobApplication;
