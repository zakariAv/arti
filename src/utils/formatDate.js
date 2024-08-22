import moment from "moment-timezone";
const formatDate = (date) => {
  const parsedDate = moment.tz(date, moment.tz.guess());
  const formattedDate = parsedDate.format("DD/MM/YYYY");
  return formattedDate;
};

export default formatDate;
