const MS_IN_WEEK = 1000 * 60 * 60 * 24 * 7;

export default function weeksSince(startDate) {
  const start = new Date(startDate);
  const now = new Date();

  const diffMs = now - start;
  return Math.floor(diffMs / MS_IN_WEEK);
}
