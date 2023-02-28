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

export const getExactAge = (dob) => {
  let birthDate = parseInt(dob.split(" ")[1]);
  let birthMonth = MONTHS_NAME_SHORT.indexOf(dob.split(" ")[0]) + 1;
  let birthYear = parseInt(dob.split(" ")[2]);

  let date = new Date();
  let currentDate = date.getDate();
  let currentMonth = 1 + date.getMonth();
  let currentYear = date.getFullYear();
  let monthArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // check whether a leap year or not
  if (currentYear % 4 === 0) {
    monthArray[1] = 29;
  }

  if (birthDate > currentDate) {
    currentDate = currentDate + monthArray[currentMonth - 1];
    currentMonth = currentMonth - 1;
  }
  if (birthMonth > currentMonth) {
    currentMonth = currentMonth + 12;
    currentYear = currentYear - 1;
  }
  let d = currentDate - birthDate;
  let m = currentMonth - birthMonth;
  let y = currentYear - birthYear;

  if (y == 0) {
    if (m == 0) return `${d} Days`;

    return `${m} Months ${d} Days`;
  }

  return `${y} Years ${m} Months ${d} Days`;
};

export const getThisYearBirthDay = (dobString) => {
  const dateMonth = dobString.split(",")[0];
  const currentYear = new Date().getFullYear();
  return `${dateMonth}, ${currentYear}`;
};
