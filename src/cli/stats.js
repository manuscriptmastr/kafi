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
import {
  getEntryByFilename,
  getEntryFilenames,
  mapAsync,
  partialEq,
  pathString
} from '../util';

/**
 * @todo add keywords field or incorporate a library that pulls them out, e.g. 'weak', 'empty', 'sour', 'tangy'
 */

const DEFAULT_FIELDS = ['coffee.origin.region', 'coffee.roaster', 'ratio', 'grind', 'pourTime'];

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
      default: DEFAULT_FIELDS
    })
  ,
  handler: ({ ['$0']: pos, _, sort, fields, ...filters }) => pipeWith(andThen, [
    getEntryFilenames,
    mapAsync(getEntryByFilename),
    filter(partialEq(filters)),
    sortBy(pathString(sort)),
    map(strainBy([sort, ...fields])),
    tap(console.table),
  ])()
};
