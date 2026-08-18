import { AuthContext } from "@/components/app/authContext";
import { getApplicationsMetrics } from "@/repository/applicationApis";
import { useQuery } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useContext, useEffect, useMemo } from "react";
import { IoMdMenu } from "react-icons/io";
import { useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { DashboardCard } from "../components/app/dashboardCard";

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

export function Dashboard() {
  const columns = [
    {
      accessorKey: "metricName",
      header: "",
    },
    { accessorKey: "pending", header: "Pending" },
    { accessorKey: "shortlisted", header: "Shortlisted" },
    { accessorKey: "completed", header: "Completed" },
    {
      accessorKey: "rejected",
      header: "Rejected",
    },
    {
      accessorKey: "total",
      header: "Total",
      cell: ({ row }) => {
        const total =
          row.original.pending +
          row.original.completed +
          row.original.shortlisted +
          row.original.rejected;
        return total;
      },
    },
  ];

  const { onSideBarClick } = useOutletContext();

  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useContext(AuthContext);
  const handleOnSideBarClick = () => {
    onSideBarClick();
  };

  const {
    data: queryResult,
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["queryResult"],
    queryFn: async () => {
      const response = await getApplicationsMetrics();

      return Array.isArray(response) ? response : [];
    },

    placeholderData: (keepPreviousData) => keepPreviousData,
  });

  console.log("data from be:", queryResult);

  const filteredData = useMemo(() => {
    if (!queryResult || !Array.isArray(queryResult)) return [];
    return queryResult.map((item) => {
      const key = Object.keys(item)[0];
      const metrics = item[key] || {};

      return {
        metricName: key.charAt(0).toUpperCase() + key.slice(1),
        pending: metrics.pending || 0,
        shortlisted: metrics.shortlisted || 0,
        completed: metrics.completed || 0,
        rejected: metrics.rejected || 0,
      };
    });
  }, [queryResult]);

  const metricsMap = useMemo(() => {
    const map = {
      test: { pending: 0, shortlisted: 0, completed: 0, rejected: 0 },
      interview: { pending: 0, shortlisted: 0, completed: 0, rejected: 0 },
      assignment: { pending: 0, shortlisted: 0, completed: 0, rejected: 0 },
    };

    if (queryResult && Array.isArray(queryResult)) {
      queryResult.forEach((item) => {
        const key = Object.keys(item)[0];
        if (map[key]) {
          map[key] = {
            pending: item[key].pending || 0,
            shortlisted: item[key].shortlisted || 0,
            completed: item[key].completed || 0,
            rejected: item[key].rejected || 0,
          };
        }
      });
    }
    return map;
  }, [queryResult]);

  const { totalApps, activeApps, successRate } = useMemo(() => {
    const { test, interview, assignment } = metricsMap;

    const testTotal =
      test.pending + test.shortlisted + test.completed + test.rejected;
    const interviewTotal =
      interview.pending +
      interview.shortlisted +
      interview.completed +
      interview.rejected;
    const assignmentTotal =
      assignment.pending +
      assignment.shortlisted +
      assignment.completed +
      assignment.rejected;

    const total = testTotal + interviewTotal + assignmentTotal;

    // Active applications: Pending or Shortlisted status across all stages
    const active =
      test.pending +
      test.shortlisted +
      assignment.pending +
      assignment.shortlisted +
      interview.pending +
      interview.shortlisted;

    // Success Rate = shortlisted+completed / total
    const totalShortlisted =
      test.shortlisted + interview.shortlisted + assignment.shortlisted;
    const totalCompleted =
      test.completed + interview.completed + assignment.completed;
    const successRateVal =
      total > 0 ? ((totalShortlisted + totalCompleted) / total) * 100 : 0;
    const successRateStr = total > 0 ? `${successRateVal.toFixed(1)}%` : "0.0%";

    return {
      totalApps: total,
      activeApps: active,
      successRate: successRateStr,
    };
  }, [metricsMap]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    if (!error) return;
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      console.log("unauthorized or forbidden error: ", error);
      toast.error("please login.");
      setUser(null);
      setIsAuthenticated(false);
      navigate("/login", { replace: true });
    }
  }, [error, navigate, setUser, setIsAuthenticated]);

  return (
    <div className="flex flex-col xs text-xs sm:text-sm h-full bg-neutral-50 dark:bg-zinc-950 text-neutral-900 dark:text-zinc-100 transition-colors duration-200">
      <div className="py-2 px-2 items-center flex justify-between shadow-[0_1px_7px_-5px_rgba(0,0,0,0.3)] bg-white dark:bg-zinc-900 border-b border-transparent dark:border-zinc-800 min-h-20 transition-colors duration-200">
        <button
          onClick={handleOnSideBarClick}
          className="lg:hidden text-l md:text-xl"
        >
          <IoMdMenu />
        </button>
        <p className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-zinc-100">
          Dashboard
        </p>
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
          <div className="m-4 sm:m-10 bg-white dark:bg-zinc-900 rounded-md border border-neutral-200 dark:border-zinc-800 w-fit shadow-sm overflow-hidden transition-colors duration-200">
            <table className="hidden md:block lg:w-fit table-fixed">
              <thead className="whitespace-nowrap">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="py-2.5 px-4 text-center text-sm font-semibold text-neutral-500 dark:text-zinc-400 border-b border-neutral-200 dark:border-zinc-800"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-neutral-100 dark:border-zinc-800/40 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="py-3 px-4 text-center text-neutral-800 dark:text-zinc-200"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="m-5 md:hidden gap-y-2 flex flex-col">
            {queryResult?.map((item, index) => {
              return <DashboardCard key={index} item={item} />;
            })}
          </div>

          <div className="m-5 sm:m-10 grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl">
            <div className="bg-white dark:bg-zinc-900 p-5 rounded-lg border border-neutral-200 dark:border-zinc-800 shadow-sm transition-colors duration-200">
              <p className="text-sm font-semibold text-neutral-500 dark:text-zinc-400">
                Total Applications
              </p>
              <p className="text-3xl font-extrabold mt-2 text-neutral-900 dark:text-zinc-100">
                {totalApps}
              </p>
            </div>
            <div className="bg-white dark:bg-zinc-900 p-5 rounded-lg border border-neutral-200 dark:border-zinc-800 shadow-sm transition-colors duration-200">
              <p className="text-sm font-semibold text-neutral-500 dark:text-zinc-400">
                Active Applications
              </p>
              <p className="text-3xl font-extrabold mt-2 text-neutral-900 dark:text-zinc-100">
                {activeApps}
              </p>
              <p className="text-[10px] text-neutral-400 dark:text-zinc-555 mt-1 font-medium">
                Pending + Shortlisted status (all stages)
              </p>
            </div>
            <div className="bg-white dark:bg-zinc-900 p-5 rounded-lg border border-neutral-200 dark:border-zinc-800 shadow-sm transition-colors duration-200">
              <p className="text-sm font-semibold text-neutral-500 dark:text-zinc-400">
                Success Rate
              </p>
              <p className="text-3xl font-extrabold mt-2 text-neutral-900 dark:text-zinc-100">
                {successRate}
              </p>
              <p className="text-[10px] text-neutral-400 dark:text-zinc-550 mt-1 font-medium">
                Shortlisted + Completed
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
