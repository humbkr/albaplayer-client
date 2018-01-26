/*
Sort function with nested objects capabilities.
 */
const immutableNestedSort = (items, prop) => {
  const property = prop.split('.');
  const len = property.length;

  let result = 0;

  return [...items].sort((propA, propB) => {
    let a = propA;
    let b = propB;
    let i = 0;
    while (i < len) {
      a = a[property[i]];
      b = b[property[i]];
      i++;
    }

    if (typeof a === 'string' || a instanceof String) {
      if (a.toLowerCase() > b.toLowerCase()) {
        result = 1;
      } else if (b.toLowerCase() > a.toLowerCase()) {
        result = -1;
      }

      return result;
    }

    if (a > b) {
      result = 1;
    } else if ((b > a)) {
      result = -1;
    }

    return result;
  });
};

function immutableRemove(arr, index) {
  return arr.slice(0, index).concat(arr.slice(index + 1));
}

const formatDuration = (amount) => {
  if (amount === undefined) {
    return 0;
  }

  const secNum = parseInt(amount, 10);
  const hours = Math.floor(secNum / 3600);
  let minutes = Math.floor((secNum - (hours * 3600)) / 60);
  let seconds = secNum - (hours * 3600) - (minutes * 60);

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
};


export {
  immutableNestedSort,
  immutableRemove,
  formatDuration,
};
