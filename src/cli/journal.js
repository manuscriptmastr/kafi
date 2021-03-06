import { exec as execCb } from 'child_process';
import dayjs from 'dayjs';
import { mkdir, writeFile } from 'fs/promises';
import JSONSchemaDefaults from 'json-schema-defaults';
import { dirname } from 'path';
import R from 'ramda';
import { promisify } from 'util';
import {
  assocPathString,
  FRIENDLY_DATE_FORMAT,
  getAllEntries,
  getJSONSchema,
  parseDateTokenString,
  pathString,
} from '../util';

const { andThen, find, map, pipe, pipeWith, prop, propEq, reverse, sort } = R;

/**
 * @todo Add --clone {filepath} flag to specify a different entry to clone
 * @todo Available journal entry types should be dynamically figured out from schemas folder, e.g. getSchemas().
 * Use same function for update and stats commands.
 * @todo Rework the handler to be more modular
 * Rework this and how entry/default fields are merged together.
 */

const exec = promisify(execCb);

const DEFAULT_FIELDS = {
  cupping: ['coffee.weight', 'coffee.grind', 'water', 'equipment', 'recipe'],
  hybrid: ['coffee', 'water', 'equipment', 'recipe'],
  pourover: ['coffee', 'water', 'equipment', 'recipe'],
};

export const command = 'journal <type>';
export const desc = 'Create a new journal entry';
export const builder = (yargs) =>
  yargs
    .positional('type', {
      describe: 'Type of journal entry',
      type: 'string',
      choices: ['cupping', 'hybrid', 'pourover'],
      required: true,
    })
    .option('release', {
      describe: 'Schema version of journal entry',
      type: 'string',
      choices: ['1.0', '1.1', '1.2'],
      default: '1.2',
    })
    .option('open', {
      describe: 'Open entry in VS Code',
      type: 'boolean',
      default: true,
    });
export const handler = async ({ type, release: version, open }) => {
  const today = dayjs();
  const timestamp = today.unix();
  const filepath = parseDateTokenString(process.env.FILEPATH, today);
  const defaults = await getJSONSchema(version, type).then(JSONSchemaDefaults);
  let entry = {
    ...defaults,
    date: today.format(FRIENDLY_DATE_FORMAT),
    timestamp,
  };

  const lastEntry = await pipeWith(andThen, [
    getAllEntries,
    sort(prop('timestamp')),
    reverse,
    find(propEq('type', type)),
  ])();

  if (lastEntry) {
    const pathStringToTransform = (field) =>
      assocPathString(field, pathString(field, lastEntry));
    entry = pipe(...map(pathStringToTransform, DEFAULT_FIELDS[type]))(entry);
  }

  const dirpath = dirname(filepath);
  await mkdir(dirpath, { recursive: true });
  await writeFile(filepath, JSON.stringify(entry, null, 2), 'utf-8');
  console.log(`Wrote new entry: ${filepath}`);

  if (open) {
    await exec(`code ${filepath}`);
  }
};
