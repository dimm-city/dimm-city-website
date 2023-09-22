import { formatDistanceToNow } from "date-fns";
/**
 * @param {string | number | Date} input
 */
export function formatDate(input) {
    return formatDistanceToNow(new Date(input), { addSuffix: true });
}
