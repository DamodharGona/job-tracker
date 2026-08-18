// utils/date.js
import { format } from "date-fns";

export function formatDate(date) {
  if (!date) return "N/A";
  return format(new Date(date), "MMM d, yyyy");
}
