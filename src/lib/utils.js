const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};
export function formattedDate(when) {
  when = new Date(when);
  if (when === "Invalid Date") {
    console.log("Invalid Date");
    return "Invalid Date";
  } else return when.toLocaleString("en-US", options);
}
