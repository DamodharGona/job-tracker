import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useMemo } from "react";
import { formatDate } from "@/utils/date";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

export function Table({ applications, handleEdit, handleDelete }) {
  const columns = [
    {
      accessorKey: "companyName",
      header: "Company Name",
      cell: ({ row }) => {
        const companyName = row.original.companyName;
        return <span className="text-base font-medium">{companyName}</span>;
      },
    },
    {
      accessorKey: "jobTitle",
      header: "Job Title",
      cell: ({ row }) => {
        const jobTitle = row.original.jobTitle;

        return (
          <span className="text-neutral-800 dark:text-zinc-200 font-normal">
            {jobTitle}
          </span>
        );
      },
    },
    { accessorKey: "salaryRange", header: "Salary Range" },
    { accessorKey: "location", header: "Location" },
    { accessorKey: "stage", header: "Stage" },
    {
      accessorKey: "mode",
      header: "Mode",
      cell: ({ row }) => {
        const mode = row.original.mode;
        return (
          <div className="flex items-center gap-1">
            <span
              className={`${mode === "online" ? "text-green-600" : "text-neutral-500"} font-bold text-xl`}
            >
              •
            </span>
            <span className="uppercase">{mode}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "dueDate",
      header: "Due Date",
      cell: ({ row }) => {
        return row.original.dueDate ? formatDate(row.original.dueDate) : "";
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <span
            className={`${
              status === "completed"
                ? "bg-green-100 dark:bg-green-950/40 text-green-800 dark:text-green-300"
                : status === "pending"
                  ? "bg-yellow-100 dark:bg-yellow-950/40 text-yellow-800 dark:text-yellow-300"
                  : status === "shortlisted"
                    ? "bg-blue-100 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300"
                    : status === "rejected"
                      ? "bg-red-100 dark:bg-red-950/40 text-red-800 dark:text-red-300"
                      : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
            } px-2 rounded-md py-0.5 uppercase font-semibold text-[10px] tracking-wider`}
          >
            {status}
          </span>
        );
      },
    },

    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-x-3 text-l sm:text-xl">
          <button
            className="hover:text-purple-600 hover:cursor-pointer"
            onClick={() => handleOnEdit(row.original)}
          >
            <FaEdit />
          </button>

          <button
            className="hover:text-red-600 hover:cursor-pointer"
            onClick={() => handleOnDelete(row.original)}
          >
            <RiDeleteBin6Line />
          </button>
        </div>
      ),
    },
  ];

  const tableData = applications;

  const filteredData = useMemo(() => {
    return tableData;
  }, [tableData]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleOnEdit = (data) => {
    handleEdit(data);
  };

  const handleOnDelete = (data) => {
    handleDelete(data);
  };

  return (
    <>
      <div className="hidden text-sm lg:block lg:w-full lg:overflow-x-auto lg:overscroll-x-none lg:overflow-y-auto">
        <table className="md:min-w-225 lg:min-w-full  table-fixed">
          <thead className="whitespace-nowrap">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="border-b border-neutral-200 dark:border-zinc-800/80"
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`${header.id === "companyName" ? "md:sticky md:left-0 md:z-10 md:bg-white dark:md:bg-zinc-900" : ""} px-3 py-2.5 text-left text-xs sm:text-sm font-medium text-neutral-500 dark:text-zinc-400`}
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
                className="border-b border-neutral-100 dark:border-zinc-800/50 transition-colors"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={`${cell.column.id === "companyName" ? "md:sticky md:left-0 md:z-20 md:bg-white dark:md:bg-zinc-900" : ""} px-3 py-3 text-left`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
