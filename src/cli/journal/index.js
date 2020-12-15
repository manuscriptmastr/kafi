import dayjs from 'dayjs';
import JSONSchemaDefaults from 'json-schema-defaults';
import $RefParser from 'json-schema-ref-parser';
import R from 'ramda';
const {
  ascend,
  last,
  pick,
  pipe,
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

const DEFAULT_FIELDS = ['coffee', 'water', 'equipment', 'recipe'];

export const mostRecentFilename = pipe(
  sortWith([
    useWith(dateComparator, [dateFromFilename, dateFromFilename]),
    ascend(iterationFromFilename)
  ]),
  last
);

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

  const filenames = await getEntryFilenames();
  const filename = mostRecentFilename(filenames);

  if (filename) {
    const date = dateFromFilename(filename);
    const iteration = iterationFromFilename(filename);
    const lastEntry = await getEntryByFilename(filename);

    basename = `${basename}${date.isToday() ? `-${iteration + 1}` : ''}`;
    entry = { ...entry, ...pick(DEFAULT_FIELDS, lastEntry) };
  }

  const filepath = await writeEntry(`${basename}.json`, entry);
  console.log(`Wrote new entry: ${filepath}`);
};
