import R from 'ramda';
const {
  assocPath,
  curry,
  curryN,
  equals,
  identity,
  intersection,
  length,
  path,
  pipe,
  map,
  split,
  type,
  useWith,
  where,
} = R;

export const mapAsync = curryN(
  2,
  pipe(map, (arr) => Promise.all(arr))
);

export const pathString = useWith(path, [split('.'), identity]);

export const assocPathString = useWith(assocPath, [
  split('.'),
  identity,
  identity,
]);

export const partialEq = curry((partial, object) =>
  where(
    map(
      curry((x, y) =>
        type(x) === 'Object' && type(y) === 'Object'
          ? partialEq(x, y)
          : type(x) === 'Array' && type(y) === 'Array'
          ? pipe(intersection, length, equals(x.length))(x, y)
          : type(y) === 'Array'
          ? y.includes(x)
          : equals(x, y)
      ),
      partial
    ),
    object
  )
);

export const flatEntries = (value, pathArray = []) => {
  // Do a depth-first search for non-object properties,
  // then save them to a new object with path string syntax
  const isObject = (obj) =>
    !Array.isArray(obj) && typeof obj === 'object' && obj !== null;

  return isObject(value)
    ? Object.entries(value).flatMap(([key, newValue]) =>
        flatEntries(newValue, [...pathArray, key])
      )
    : [[pathArray, value]];
};
