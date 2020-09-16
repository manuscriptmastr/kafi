import { promises as fs } from 'fs';
import R from 'ramda';
const {
  allPass,
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
import { pathString } from '../parse';
import { table } from '../prettify';
import { mapAsync } from '../util';

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
  // filters are subobjects of a full entry object.
  // Combine into single object, then build recursive version
  // using whereEq to filter an entry based on spec object
  handler: ({ ['$0']: pos, _, sort, fields, ...filters }) => pipeWith(andThen, [
    getEntryNames,
    mapAsync(getEntryByName),
    sortBy(pathString(sort)),
    map(strainBy([sort, ...fields])),
    table,
    tap(() => console.log(filters)),
  ])()
};
