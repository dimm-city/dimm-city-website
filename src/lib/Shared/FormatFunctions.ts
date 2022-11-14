import { formatDistanceToNow } from "date-fns";
export function formatDate(input: Date) {
    return formatDistanceToNow(new Date(input), { addSuffix: true });
}

export function formatDreamTime(input: string) {
    return "who knows?!"
}