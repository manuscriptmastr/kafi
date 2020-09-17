import R from 'ramda';
const {
  curry,
  head,
  join,
  keys,
  map,
  pipe,
  prop,
  reduce,
  repeat,
  toUpper,
  values,
  zipWith
} = R;

const headers = pipe(head, keys);

const maxLength = reduce((max, str) =>
  max > str.toString().length
    ? max
    : str.toString().length
  , 0
);

const whitespace = pipe(repeat(' '), join(''));

const addTrailingWhiteSpace = curry((fill, str) =>
  str.toString().length >= fill
    ? `${str}`
    : `${str}${whitespace(fill - str.toString().length)}`
);

export const matrix = arr => {
  const head = headers(arr);
  const table = [map(toUpper, head), ...map(values, arr)];
  const dataByColumn = map(header => map(prop(header), arr), head);
  const maxLengths = map(maxLength, zipWith((h, d) => [h, ...d], head, dataByColumn));
  return map(zipWith(addTrailingWhiteSpace, maxLengths), table);
};

const row = join('   ');

const column = join('\n');

export const table = pipe(matrix, map(row), column);
