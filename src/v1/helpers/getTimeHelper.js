// <----------------------------------Iso string to date string------------------------------------------->
export const convertTiming = (isoTime) => {
  try {
    return new Date(isoTime).toDateString();
  } catch (error) {
    throw error;
  }
};
