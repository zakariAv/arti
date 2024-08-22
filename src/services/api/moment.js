import moment from "moment";

const getMoment = () => {
  return moment().format("MMMM Do YYYY, h:mm a");
};

export default getMoment;
