/*
Sort function with nested objects capabilities.
 */
const immutableNestedSort = (items, property) => {
  property = property.split('.');
  const len = property.length;

  return [ ...items ].sort((a, b) => {
    let i = 0;
    while( i < len ) {
      a = a[property[i]];
      b = b[property[i]];
      i++;
    }

    if (typeof a === 'string' || a instanceof String) {
      return (a.toLowerCase() > b.toLowerCase()) ? 1 : ((b.toLowerCase() > a.toLowerCase()) ? -1 : 0);
    }

    return (a > b) ? 1 : ((b > a) ? -1 : 0);
  });
};

function immutableRemove (arr, index) {
  return arr.slice(0,index).concat(arr.slice(index+1))
}

const formatDuration = (amount) => {
  if (amount === undefined) {
    return;
  }

  let sec_num = parseInt(amount, 10);
  let hours   = Math.floor(sec_num / 3600);
  let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  let seconds = sec_num - (hours * 3600) - (minutes * 60);

  //if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}

  return minutes + ':' + seconds;
};


export {
  immutableNestedSort,
  immutableRemove,
  formatDuration,
}
