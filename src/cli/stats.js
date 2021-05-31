import R from 'ramda';
import {
  dateComparator,
  dateFromFriendlyDate,
  getEntryByFilename,
  getEntryFilenames,
  getRelativeFilepathByEntryName,
  mapAsync,
  partialEq,
  pathString
} from '../util';
const {
  andThen,
  all,
  always,
  ascend,
  both,
  compose,
  converge,
  cond,
  curry,
  divide,
  eqProps,
  equals,
  filter,
  fromPairs,
  groupWith,
  head,
  ifElse,
  isEmpty,
  join,
  length,
  map,
  mergeWith,
  pipe,
  pipeWith,
  reduce,
  sortWith,
  sum,
  takeLast,
  tap,
  useWith,
  when
} = R;

/**
 * @todo takeLast() is more specific to sorting by date. Most times we want the first N entries.
 * How can we takeFirst() in other cases?
 * @todo Print out a graph to visualize trends,
 * such as when sweetness.quantity hits its peak in Ethiopian coffees.
 * @todo Beautify CLI with Chalk
 * @todo Strings like '3:15' should work with average
 */

const DEFAULT_SORT_FIELDS = ['date'];
const DEFAULT_FIELDS = ['coffee.roaster', 'coffee.origin.region', 'coffee.grind', 'water.temperature', 'time', 'score', 'filepath'];

const isNumber = both(
  num => typeof num === 'number',
  num => !Number.isNaN(num)
);
const average = ifElse(isEmpty, () => 0, converge(divide, [sum, length]));
const round = num => Number(Number(num).toFixed(1));

const mergeEntriesOnKey = curry((sortField, entries) => pipe(
  groupWith(eqProps(sortField)),
  map(duplicates => {
    const emptyObject = map(always([]), duplicates[0]);
    const reduced = reduce(mergeWith((a, b) => a.concat([b])), emptyObject, duplicates);
    return map(ifElse(all(isNumber), pipe(average, round), head), reduced);
  })
)(entries));

// Include only fields in entry
const strainBy = curry((fields, entry) => fromPairs(map(field => [field, pathString(field, entry)], fields)));

export const command = 'stats <type>';
export const desc = 'Analyze journal entries';
export const builder = yargs => yargs
  .positional('type', {
    describe: 'Type of journal entry',
    type: 'string',
    choices: ['cupping', 'hybrid', 'pourover'],
    required: true
  })
  .option('merge', {
    describe: 'Merge entries by one field',
    type: 'string',
    default: ''
  })
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
  })
export const handler = ({ ['$0']: pos, _, stats, fn, fields, limit, merge, sort: _sort, ...filters }) => {
  const sort = merge ? [merge] : _sort;
  return pipeWith(andThen, [
    getEntryFilenames,
    mapAsync(async filename => {
      return { ...(await getEntryByFilename(filename)), filepath: await getRelativeFilepathByEntryName(filename) }
    }),
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
    when(() => !!merge, mergeEntriesOnKey(merge)),
    takeLast(limit),
    map(map(when(Array.isArray, join(', ')))),
    tap(console.table),
  ])();
};
