import R from 'ramda';
const {
  curry,
  curryN,
  equals,
  intersection,
  length,
  path,
  pipe,
  map,
  split,
  type,
  where,
} = R;

export const mapAsync = curryN(2, pipe(map, arr => Promise.all(arr)));

export const pathString = curry((string, object) => path(split('.', string), object));

export const partialEq = curry((partial, object) => where(map(curry((x, y) =>
  type(x) === 'Object' && type(y) === 'Object'
    ? partialEq(x, y)
: type(x) === 'Array' && type(y) === 'Array'
    ? pipe(intersection, length, equals(x.length))(x, y)
: type(y) === 'Array'
    ? y.includes(x)

    : equals(x, y)
), partial), object));
