import R from 'ramda';
const {
  andThen,
  curry,
  filter,
  fromPairs,
  map,
  pipeWith,
  sortBy,
  tap
} = R;
import { table } from '../prettify';
import {
  getEntryByFilename,
  getEntryFilenames,
  mapAsync,
  partialEq,
  pathString
} from '../util';

/**
 * TODO:
 * - Tighten up JSON validation for fields like times and dates
 */

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
    getEntryFilenames,
    mapAsync(getEntryByFilename),
    filter(partialEq(filters)),
    sortBy(pathString(sort)),
    map(strainBy([sort, ...fields])),
    table,
    tap(console.log),
  ])()
};
