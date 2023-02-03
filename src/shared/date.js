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

const getDate2 = (dateInt) => {
  switch (dateInt) {
    case 1:
    case 21:
    case 31:
      return dateInt + "st";
    case 2:
    case 22:
      return dateInt + "nd";
    case 3:
    case 23:
      return dateInt + "rd";
    default:
      return dateInt + "th";
  }
};

const getDate = (dateInt) => {
  if (dateInt < 10) return "0" + dateInt;
  return dateInt;
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
