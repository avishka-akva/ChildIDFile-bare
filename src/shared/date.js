const MONTHS_NAME = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MONTHS_NAME_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const getDate = (dateInt) => {
  switch (dateInt) {
    case (1, 21, 31):
      return dateInt + "st";
    case (2, 22):
      return dateInt + "nd";
    case (3, 23):
      return dateInt + "rd";
    default:
      return dateInt + "th";
  }
};

export const formatDate = (dateObj) => {
  const date = dateObj.getDate();
  const month = dateObj.getMonth();
  const year = dateObj.getFullYear();

  return `${MONTHS_NAME_SHORT[month]} ${getDate(date)}, ${year}`;
};

export const getAge = (dob) => {
  const birthYear = parseInt(dob.split(" ")[2]);
  const currentYear = new Date().getFullYear();
  return currentYear - birthYear;
};
