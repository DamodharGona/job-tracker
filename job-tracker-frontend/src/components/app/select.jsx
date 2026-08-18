import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

function SelectComponent({ value, labelName, placeholder, onChange, options }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="data-[size=default]:h-auto w-full pl-10 py-2.5 border border-neutral-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-neutral-900 dark:text-zinc-100 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-zinc-350 focus:border-neutral-900 dark:focus:border-zinc-350 text-sm transition-all">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{labelName}</SelectLabel>

          {options.map((item) => (
            <SelectItem key={item.id} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SelectComponent;
