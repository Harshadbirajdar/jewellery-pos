export const round = (numbe) => {
  let number = Math.ceil(numbe);
  let a = (number / 10).toString().split(".");
  if (number % 100 === 0) {
    return number - 1;
  }

  if (number.legnth === 1) {
    return number;
  }

  if (a[1] > 5) {
    return (a[0] * 10 + 10) % 100 === 0 ? a[0] * 10 + 9 : a[0] * 10 + 10;
  } else {
    return (a[0] * 10) % 100 === 0 ? a[0] * 10 - 1 : a[0] * 10;
  }
};
