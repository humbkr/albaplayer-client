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


export {
  immutableNestedSort,
  immutableRemove
}
