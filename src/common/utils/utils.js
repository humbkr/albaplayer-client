function immutableRemove(arr, index) {
  return arr.slice(0, index).concat(arr.slice(index + 1))
}

const formatDuration = (amount) => {
  if (amount === undefined) {
    return 0
  }

  const secNum = parseInt(amount, 10)
  const hours = Math.floor(secNum / 3600)
  let minutes = Math.floor((secNum - hours * 3600) / 60)
  let seconds = secNum - hours * 3600 - minutes * 60

  if (minutes < 10) {
    minutes = `0${minutes}`
  }
  if (seconds < 10) {
    seconds = `0${seconds}`
  }

  return `${minutes}:${seconds}`
}

// Transform a disc number value to a string: 'D000'
const sanitizeDiscNumber = (discNumber) => {
  const asString = `${discNumber}`
  const split = asString.split('/')

  return `D${split[0]}`
}
const sanitizeTrackNumber = (trackNumber) => {
  const asString = `${trackNumber}`
  const split = asString.split('/')

  return `T${split[0].padStart(3, '0')}`
}

const immutableNestedSort = (items, prop) => {
  const property = prop.split('.')
  // Get depth.
  const len = property.length

  let result = 0

  return [...items].sort((propA, propB) => {
    // PropA and propB are objects so we need to find the property value to compare.
    // For that we look for an object property given the depth of prop that we were passed.
    let a = propA
    let b = propB
    let i = 0
    while (i < len) {
      a = a[property[i]]
      b = b[property[i]]
      i++
    }

    // Sort if value type is string.
    if (typeof a === 'string' || a instanceof String) {
      if (a.toLowerCase() > b.toLowerCase()) {
        result = 1
      } else if (b.toLowerCase() > a.toLowerCase()) {
        result = -1
      }

      return result
    }

    // Sort if value type is number.
    if (a > b) {
      result = 1
    } else if (b > a) {
      result = -1
    }

    return result
  })
}

/*
Sort function specifically designed for tracks list.
 */
const immutableSortTracks = (items, prop) => {
  let result = 0

  return [...items].sort((propA, propB) => {
    // PropA and propB are objects so we need to find the property value to compare.
    // For that we look for an object property given the depth of prop that we were passed.
    let a = propA
    let b = propB

    if (prop === 'number') {
      // Special case for track number: we also need to sort by disc.
      a = `${sanitizeDiscNumber(propA.disc)}${sanitizeTrackNumber(
        propA.number
      )}`
      b = `${sanitizeDiscNumber(propB.disc)}${sanitizeTrackNumber(
        propB.number
      )}`
    } else {
      a = a[prop]
      b = b[prop]
    }

    // Sort if value type is string.
    if (typeof a === 'string' || a instanceof String) {
      if (a.toLowerCase() > b.toLowerCase()) {
        result = 1
      } else if (b.toLowerCase() > a.toLowerCase()) {
        result = -1
      }

      return result
    }

    // Sort if value type is number.
    if (a > b) {
      result = 1
    } else if (b > a) {
      result = -1
    }

    return result
  })
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
const getRandomInt = (min, max) => {
  const minVal = Math.ceil(min)
  const maxVal = Math.floor(max)
  return Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal
}

export {
  immutableNestedSort,
  immutableSortTracks,
  immutableRemove,
  formatDuration,
  getRandomInt,
}
