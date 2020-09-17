import { promises as fs } from 'fs';
import R from 'ramda';
const {
  andThen,
  curry,
  filter,
  fromPairs,
  map,
  pipeWith,
  prop,
  sortBy,
  tap
} = R;
import { table } from '../prettify';
import { mapAsync, partialEq, pathString } from '../util';

/**
 * TODO:
 * - Tighten up JSON validation for fields like times and dates
 */

// Get filenames of all entries
const getEntryNames = () => fs.readdir(`${process.cwd()}/entries`);
// Import entry from filename
const getEntryByName = name => import(`${process.cwd()}/entries/${name}`).then(prop('default'));
// Include only fields in entry
const strainBy = curry((fields, entry) => fromPairs(map(field => [field, pathString(field, entry)], fields)));

export default {
  command: 'stats',
  desc: 'Analyze journal entries',
  builder: yargs => yargs
    .option('sort', {
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
  handler: ({ ['$0']: pos, _, sort, fields, ...filters }) => pipeWith(andThen, [
    getEntryNames,
    mapAsync(getEntryByName),
    filter(partialEq(filters)),
    sortBy(pathString(sort)),
    map(strainBy([sort, ...fields])),
    table,
    tap(console.log),
  ])()
};
