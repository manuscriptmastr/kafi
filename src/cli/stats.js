import { promises as fs } from 'fs';
import R from 'ramda';
const {
  andThen,
  converge,
  curry,
  curryN,
  fromPairs,
  head,
  join,
  keys,
  map,
  o,
  path,
  pipe,
  pipeWith,
  prop,
  sortBy,
  split,
  tap,
  toUpper,
  unapply,
  values
} = R;

/**
 * TODO:
 * - Add support for the --match flag
 * - Add support for helper functions like
 *   - simple equality: grind(23) same as grind(eq(23))
 *   - dot properties: equipment.method(Hario V60)
 *   - comparisons: pourTime(lt(2:00))
 * - Line up columns in reports
 */

const mapAsync = curryN(2, pipe(map, arr => Promise.all(arr)));
// Get filenames of all entries
const getEntryNames = () => fs.readdir(`${process.cwd()}/entries`);
// Import entry from filename
const getEntryByName = name => import(`${process.cwd()}/entries/${name}`).then(prop('default'));
// Find value in object from property or path string
const pathStr = curry((string, object) => path(split('.', string), object));
// Include only fields in entry
const strainBy = curry((fields, entry) => fromPairs(map(field => [field, pathStr(field, entry)], fields)));
// Get header string from list of entries
const headers = pipe(head, keys, join('   '), toUpper);
// Format entries to stdout-friendy
const data = pipe(map(pipe(values, join('   '))), join('\n'));
// Create report from entries
const prettify = converge(unapply(join('\n')), [headers, data]);

export default {
  command: 'stats',
  desc: 'Analyze journal entries',
  builder: yargs => yargs
    .option('by', {
      describe: 'Sort results by field',
      type: 'string',
      default: 'score'
    })
    .option('fields', {
      describe: 'Fields to include',
      type: 'array',
      demandOption: true
    })
  ,
  handler: ({ by, fields }) => pipeWith(andThen, [
    getEntryNames,
    mapAsync(getEntryByName),
    sortBy(pathStr(by)),
    map(strainBy([by, ...fields])),
    prettify,
    tap(console.log),
  ])()
};
