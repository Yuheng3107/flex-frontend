import { formatDistance } from "date-fns";

export function timeSince(date: any) {
  return formatDistance(date, new Date(), {
    addSuffix: true,
  });
}
