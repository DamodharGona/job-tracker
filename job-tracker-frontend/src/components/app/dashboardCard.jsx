export function DashboardCard({ item }) {
  const name = Object.keys(item);
  const total =
    item[name].pending +
    item[name].completed +
    item[name].shortlisted +
    item[name].rejected;

  return (
    <section className="border border-neutral-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-md flex flex-col p-4 shadow-sm transition-colors duration-200">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-lg capitalize text-neutral-900 dark:text-zinc-100">{name}</h2>
        <span className="text-sm text-neutral-500 dark:text-zinc-400 font-medium">Total: {total}</span>
      </div>

      <div className="mt-3 flex flex-col gap-2 text-sm sm:flex-row sm:justify-between text-neutral-600 dark:text-zinc-300">
        <div className="flex gap-x-1 w-25 justify-between">
          <span className="text-neutral-500 dark:text-zinc-400">Pending :</span>
          <span className="font-semibold text-neutral-900 dark:text-zinc-100">{item[name].pending}</span>
        </div>
        <div className="flex gap-x-1 w-25 justify-between">
          <span className="text-neutral-500 dark:text-zinc-400">Completed :</span>
          <span className="font-semibold text-neutral-900 dark:text-zinc-100">{item[name].completed}</span>
        </div>
        <div className="flex gap-x-1 w-25 justify-between">
          <span className="text-neutral-500 dark:text-zinc-400">Rejected :</span>
          <span className="font-semibold text-neutral-900 dark:text-zinc-100">{item[name].rejected}</span>
        </div>
        <div className="flex gap-x-1 w-25 justify-between">
          <span className="text-neutral-500 dark:text-zinc-400">Shortlisted :</span>
          <span className="font-semibold text-neutral-900 dark:text-zinc-100">{item[name].shortlisted}</span>
        </div>
      </div>
    </section>
  );
}
