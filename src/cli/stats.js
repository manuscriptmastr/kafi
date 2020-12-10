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
  takeLast,
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

const DEFAULT_SORT_FIELDS = ['date'];
const DEFAULT_FIELDS = ['coffee.roaster', 'coffee.origin.region', 'coffee.grind', 'time', 'score'];

// Include only fields in entry
const strainBy = curry((fields, entry) => fromPairs(map(field => [field, pathString(field, entry)], fields)));

export const command = 'stats';
export const desc = 'Analyze journal entries';
export const builder = yargs => yargs
  .option('fields', {
    describe: 'Fields to include',
    type: 'array',
    default: DEFAULT_FIELDS
  })
  .option('limit', {
    describe: 'Maximum entries to display',
    type: 'number',
    default: 30
  })
  .option('sort', {
    describe: 'Sort results by fields',
    type: 'array',
    default: DEFAULT_SORT_FIELDS
  });
export const handler = ({ ['$0']: pos, _, fields, limit, sort, ...filters }) => pipeWith(andThen, [
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
  takeLast(limit),
  map(strainBy([...sort, ...fields])),
  tap(console.table),
])();
