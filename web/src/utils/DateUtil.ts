export const formatDate = (date: Date) => {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join("/");
};

const padTo2Digits = (num: number) => {
  return num.toString().padStart(2, "0");
};
