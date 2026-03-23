export const timeFormat = (time: number) => {
  if (!time) return "";

  const minutes = Math.floor(Math.floor((time % 360000) / 6000))
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((time % 6000) / 100)
    .toString()
    .padStart(2, "0");
  const milliseconds = (time % 100).toString().padStart(2, "0");

  return `${minutes}:${seconds}.${milliseconds}`;
};

export const truncateString = (str: string, maxLength: number = 10) => {
  if (str?.length > maxLength) {
    return str?.substring(0, maxLength) + "...";
  }
  return str;
};
