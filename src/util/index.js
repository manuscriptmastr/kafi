import R from 'ramda';
const {
  curryN,
  pipe,
  map
} = R;

export const mapAsync = curryN(2, pipe(map, arr => Promise.all(arr)));