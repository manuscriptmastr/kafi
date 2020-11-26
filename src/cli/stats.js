import R from 'ramda';
const {
  andThen,
  ascend,
  compose,
  cond,
  curry,
  equals,
  filter,
  fromPairs,
  map,
  pipeWith,
  sortWith,
  useWith,
  tap
} = R;
import {
  dateComparator,
  dateFromFriendlyDate,
  getEntryByFilename,
  getEntryFilenames,
  mapAsync,
  partialEq,
  pathString
} from '../util';

/**
 * @todo Add a limit field
 */

const DEFAULT_SORT_FIELDS = ['score'];
const DEFAULT_FIELDS = ['coffee.origin.region', 'coffee.roaster', 'ratio', 'grind', 'pourTime'];

// Include only fields in entry
const strainBy = curry((fields, entry) => fromPairs(map(field => [field, pathString(field, entry)], fields)));

export default {
  command: 'stats',
  desc: 'Analyze journal entries',
  builder: yargs => yargs
    .option('sort', {
      describe: 'Sort results by fields',
      type: 'array',
      default: DEFAULT_SORT_FIELDS
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
    sortWith([
      ...map(
        cond([
          [equals('date'), () => useWith(dateComparator, [dateFromFriendlyDate, dateFromFriendlyDate])],
          [() => true, compose(ascend, pathString)]
        ])
      , sort),
    ]),
    map(strainBy([...sort, ...fields])),
    tap(console.table),
  ])()
};
