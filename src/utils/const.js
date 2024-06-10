export const NamingFunction = (text = "") => {
  const split_chk = text.split(" ");
  if (split_chk.length === 1) {
    return `${text[0]}${text[1]}`.toUpperCase();
  } else if (split_chk.length === 2) {
    return split_chk[0][0].toUpperCase() + split_chk[1][0].toUpperCase();
  } else if (split_chk.length > 2) {
    return split_chk[0][0].toUpperCase() + split_chk[2][0].toUpperCase();
  }
};

export const formatDate = (date) => {
  const currentDate = new Date(date);
  const hour = currentDate.getHours();
  const minute = currentDate.getMinutes();
  const day = currentDate.getDate();
  const month = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();
  const formattedHour = hour % 12 || 12;
  const amPm = hour >= 12 ? "PM" : "AM";
  const formattedDate = `${formattedHour}:${minute
    .toString()
    .padStart(2, "0")} ${amPm}, ${day} ${month} ${year}`;
  return formattedDate;
};
