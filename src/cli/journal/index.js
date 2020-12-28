import dayjs from 'dayjs';
import JSONSchemaDefaults from 'json-schema-defaults';
import $RefParser from 'json-schema-ref-parser';
import R from 'ramda';
const {
  andThen,
  ascend,
  curry,
  last,
  pick,
  pipeWith,
  propEq,
  reverse,
  sortWith,
  useWith
} = R;
import {
  DATE_FORMAT,
  dateComparator,
  dateFromFilename,
  FRIENDLY_DATE_FORMAT,
  getEntryByFilename,
  getEntryFilenames,
  getJSONSchema,
  iterationFromFilename,
  writeEntry
} from '../../util';

/**
 * @todo Should iteration start from 1?
 * then rework logic for generating filename from entry (perhaps a function like writeEntry(date, iteration, entry))
 * @todo Rework the handler to be more modular
 * @todo DEFAULT_FIELDS should be different for cupping.
 * Rework this and how entry/default fields are merged together.
 * @todo Standardize country/region/{grower => producer} and add fields for cultivar, variety, process, elevation, etc.
 */

const DEFAULT_FIELDS = ['coffee', 'water', 'equipment', 'recipe'];

export const sortFilenamesByDate = sortWith([
  useWith(dateComparator, [dateFromFilename, dateFromFilename]),
  ascend(iterationFromFilename)
]);

const findFirstEntryOfType = curry(async (type, filenames) => {
  let entry;
  for (const filename of filenames) {
    const candidate = await getEntryByFilename(filename);
    if (propEq('type', type, candidate)) {
      entry = candidate;
      break;
    }
  }
  return entry;
});

export const command = 'journal <type>';
export const desc = 'Create a new journal entry';
export const builder = yargs => yargs
  .positional('type', {
    describe: 'Type of journal entry',
    type: 'string',
    choices: ['pourover', 'cupping'],
    required: true
  })
export const handler = async ({ type, version = '1.0' }) => {
  const today = dayjs();
  let basename = today.format(DATE_FORMAT);
  const defaults = await getJSONSchema(version, type)
    .then($RefParser.dereference.bind($RefParser))
    .then(JSONSchemaDefaults);
  let entry = { ...defaults, date: today.format(FRIENDLY_DATE_FORMAT) };

  const lastFilename = await pipeWith(andThen, [
    getEntryFilenames,
    sortFilenamesByDate,
    last
  ])();

  if (lastFilename) {
    const date = dateFromFilename(lastFilename);
    const iteration = date.isToday() ? iterationFromFilename(lastFilename) + 1 : 0;
    basename = `${basename}${iteration > 0 ? `-${iteration}` : ''}`;
    entry = { ...entry, iteration };
  }

  const lastEntry = await pipeWith(andThen, [
    getEntryFilenames,
    sortFilenamesByDate,
    reverse,
    findFirstEntryOfType(type)
  ])();

  if (lastEntry) {
    entry = { ...entry, ...pick(DEFAULT_FIELDS, lastEntry) };
  }

  const filepath = await writeEntry(`${basename}.json`, entry);
  console.log(`Wrote new entry: ${filepath}`);
};
