export const timeAgo = (dateString: string) => {
  const now = new Date();
  const past = new Date(dateString);

  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";

  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes < 60) return `${minutes} minutes ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;

  return past.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
};

export function getFormattedDate() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function getDayProgress() {
  const now = new Date();
  const total = 24 * 60;
  const elapsed = now.getHours() * 60 + now.getMinutes();
  return elapsed / total;
}
