export const primaryColor = "blue";
export const tinyApiKey = "so7inpl77uhpaimhqkti3h9dlclq5m0ra8ipnsd7pbxj8xk2";
export const years = () => {
  var d = new Date();
  var currentYear = d.getFullYear();
  const dates = [];
  for (let i = 2000; i <= currentYear; i++) {
    dates.push(i);
  }

  return dates;
};
export const imageStyles = function (
  height,
  width = "100%",
  objectFit = "cover"
) {
  return {
    height: height,
    width,
    objectFit,
    objectPosition: objectFit,
  };
};

export const imageOpacityStyles = function (
  height,
  width = "100%",
  objectFit = "cover"
) {
  return {
    height: height,
    width,
    objectFit,
    opacity: 0.8,
    objectPosition: objectFit,
  };
};
