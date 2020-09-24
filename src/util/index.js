import { promises as fs } from 'fs';
import R from 'ramda';
const {
  curry,
  curryN,
  equals,
  is,
  path,
  pipe,
  prop,
  map,
  split,
  where,
} = R;

export const mapAsync = curryN(2, pipe(map, arr => Promise.all(arr)));

export const pathString = curry((string, object) => path(split('.', string), object));

export const partialEq = curry((partial, object) => where(map(curry((x, y) =>
  is(Object, x) && is(Object, y)
    ? partialEq(x, y)
    : equals(x, y))
, partial), object));

export const getEntryFilenames = () => fs.readdir(`${process.cwd()}/entries`);

export const getEntryByFilename = filename =>
  import(`${process.cwd()}/entries/${filename}`)
    .then(prop('default'));

export const writeEntry = curry((filename, entry) =>
  fs.writeFile(`${process.cwd()}/entries/${filename}`, JSON.stringify(entry))
);
