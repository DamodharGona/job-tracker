import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export function BulletPointAccordion({ id, bulletLine, sourceLine }) {
  return (
    <AccordionItem value={id} className="mb-2">
      <AccordionTrigger className="flex flex-col border border-neutral-300 dark:border-zinc-800 pt-2 px-2 bg-white dark:bg-zinc-900 hover:bg-neutral-100 dark:hover:bg-zinc-800/50 focus:border-neutral-900 dark:focus:border-zinc-300 focus:ring-2 rounded-md transition-colors duration-200">
        <div className="flex">
          <span className="text-neutral-900 dark:text-zinc-100 font-medium text-left">{bulletLine}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="flex p-2 rounded-md bg-neutral-50/50 dark:bg-zinc-900/40 border-x border-b border-neutral-300 dark:border-zinc-800 rounded-b-md -mt-1 transition-colors duration-200">
        <AccordionContent className="rounded-md p-2">
          <div className="flex flex-col gap-1 text-neutral-600 dark:text-zinc-350">
            <span className="font-semibold text-neutral-900 dark:text-zinc-200">Original:</span>
            <span className="leading-relaxed">{sourceLine}</span>
          </div>
        </AccordionContent>
      </AccordionContent>
    </AccordionItem>
  );
}
