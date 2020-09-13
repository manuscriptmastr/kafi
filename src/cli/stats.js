import { promises as fs } from 'fs';
import R from 'ramda';
const {
  allPass,
  andThen,
  curry,
  curryN,
  filter,
  fromPairs,
  head,
  join,
  keys,
  map,
  path,
  pipe,
  pipeWith,
  prop,
  reduce,
  repeat,
  sortBy,
  split,
  tap,
  toUpper,
  values,
  zipWith
} = R;

/**
 * TODO:
 * - Add support for the --match flag
 * - Add support for helper functions like
 *   - "grind(23)" or "grind(equals(23))" => pipe(path(['grind']), equals(23))
 *   - "equipment.grinder("Comandante C40 MK3")" => pipe(path(['equipment', 'grinder']), equals('Comandante C40 MK3'))
 *   - "equipment.method("Hario V60")" => pipe(path(['equipment', 'method']), equals('Hario V60'))
 *   - "acidity.notes(contains("plum"))" => pipe(path(['acidity', 'notes']), includes('plum'))
 *   - "pourTime(lessthan(2:00))" => pipe(path(['pourTime']), lt('2:00'))
 *   - "date(before("August 3rd"))" => pipe(path(['date']), ...somefancydatefn)
 * - Tighten up JSON validation for fields like times and dates
 */

const mapAsync = curryN(2, pipe(map, arr => Promise.all(arr)));
// Get filenames of all entries
const getEntryNames = () => fs.readdir(`${process.cwd()}/entries`);
// Import entry from filename
const getEntryByName = name => import(`${process.cwd()}/entries/${name}`).then(prop('default'));
// Find value in object from property or path string
const pathString = curry((string, object) => path(split('.', string), object));
// Include only fields in entry
const strainBy = curry((fields, entry) => fromPairs(map(field => [field, pathString(field, entry)], fields)));
// Prettify logic
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

const matrix = arr => {
  const head = headers(arr);
  const table = [map(toUpper, head), repeat(' ', head.length), ...map(values, arr)];
  const dataByColumn = map(header => map(prop(header), arr), head);
  const maxLengths = map(maxLength, zipWith((h, d) => [h, ...d], head, dataByColumn));
  return map(zipWith(addTrailingWhiteSpace, maxLengths), table);
};

const row = join('   ');

const column = join('\n');

const prettify = pipe(matrix, map(row), column);

export default {
  command: 'stats',
  desc: 'Analyze journal entries',
  builder: yargs => yargs
    .option('by', {
      alias: ['b', 'sort'],
      describe: 'Sort results by field',
      type: 'string',
      default: 'score'
    })
    // .option('match', {
    //   alias: ['m', 'filter', 'filters'],
    //   describe: 'Filter entries by criteria',
    //   type: 'array',
    //   default: []
    // })
    .option('fields', {
      alias: ['f', 'include'],
      describe: 'Fields to include',
      type: 'array',
      demandOption: true
    })
  ,
  handler: ({ by, match, fields }) => pipeWith(andThen, [
    getEntryNames,
    mapAsync(getEntryByName),
    filter(allPass(match)),
    sortBy(pathString(by)),
    map(strainBy([by, ...fields])),
    prettify,
    tap(console.log),
  ])()
};
