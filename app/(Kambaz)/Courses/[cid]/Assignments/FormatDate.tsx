export function formatDateTime(dateString: string) {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  const monthDay = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric" }).format(date);
  const time = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", hour12: true }).format(date);

  return `${monthDay} at ${time}`;
}
