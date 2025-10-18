export function formatDateTime(dateString: string) {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString; // fallback if invalid

  const options: Intl.DateTimeFormatOptions = {
    month: "long",      // November
    day: "numeric",     // 2
    hour: "numeric",    // 12
    minute: "2-digit",  // 00
    hour12: true        // AM/PM
  };

  // Format date part + time part separated by ' at '
  const monthDay = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric" }).format(date);
  const time = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", hour12: true }).format(date);

  return `${monthDay} at ${time}`;
}