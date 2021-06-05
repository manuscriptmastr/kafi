import { exec as execCb } from 'child_process';
import dayjs from 'dayjs';
import JSONSchemaDefaults from 'json-schema-defaults';
import R from 'ramda';
import { promisify } from 'util';
import {
  assocPathString,
  dateComparator,
  dateFromFilename, DATE_FORMAT,
  FRIENDLY_DATE_FORMAT,
  getEntryByFilename,
  getEntryFilenames,
  getJSONSchema,
  iterationFromFilename,
  pathString,
  writeEntry
} from '../../util';
const {
  andThen,
  ascend,
  curry,
  last,
  map,
  pipe,
  pipeWith,
  propEq,
  reverse,
  sortWith,
  useWith
} = R;

/**
 * @todo Add --clone {filepath} flag to specify a different entry to clone
 * @todo Available journal entry types should be dynamically figured out from schemas folder, e.g. getSchemas().
 * Use same function for update and stats commands.
 * @todo Should iteration start from 1?
 * then rework logic for generating filename from entry (perhaps a function like writeEntry(date, iteration, entry))
 * @todo Rework the handler to be more modular
 * Rework this and how entry/default fields are merged together.
 * @todo Sorting by date doesn't work correctly.
 * Change journal entry file format to YYYY-MM-DD-I.
 */

const exec = promisify(execCb);

const DEFAULT_FIELDS = {
  cupping: ['coffee.weight', 'coffee.grind', 'water', 'equipment', 'recipe'],
  hybrid: ['coffee', 'water', 'equipment', 'recipe'],
  pourover: ['coffee', 'water', 'equipment', 'recipe']
}

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
    choices: ['cupping', 'hybrid', 'pourover'],
    required: true
  })
  .option('open', {
    describe: 'Open entry in VS Code',
    type: 'boolean',
    default: true
  })
export const handler = async ({ type, version = '1.1', open }) => {
  const today = dayjs();
  let basename = today.format(DATE_FORMAT);
  const defaults = await getJSONSchema(version, type)
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
    const pathStringToTransform = field => assocPathString(field, pathString(field, lastEntry));
    entry = pipe(...map(pathStringToTransform, DEFAULT_FIELDS[type]))(entry);
  }

  const filepath = await writeEntry(`${basename}.json`, entry);
  console.log(`Wrote new entry: ${filepath}`);

  if (open) {
    await exec(`code ${filepath}`);
  }
};
