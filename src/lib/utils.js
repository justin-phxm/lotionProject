export function formatDate() {
  const date = new Date().toISOString().slice(0, 10) + "T10:15";
  return date;
}
