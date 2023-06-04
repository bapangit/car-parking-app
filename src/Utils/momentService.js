import moment from "moment";

const format = "MMHHDDMMYYYY";

export const getCurrentTime = () => {
  return moment().format(format);
};
export const getFormattedTime = (timeString) => {
  return moment(timeString, format);
};
