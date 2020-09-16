import R from 'ramda';
const {
  curry,
  path,
  split
} = R;

// Find value in object from property or path string
export const pathString = curry((string, object) => path(split('.', string), object));
