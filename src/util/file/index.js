import { access, readdir, writeFile } from 'fs/promises';
import { dirname, relative, resolve } from 'path';
import R from 'ramda';
import { fileURLToPath } from 'url';
const { andThen, curry, filter, endsWith, pipeWith, prop } = R;

/**
 * @todo Filepath is passed in by user but has a sane default in codebase.
 * - Given a date of August 1, 2020
 * - And a user-defined env variable such as PATTERN="~/Desktop/My Coffee Journal/{YY}/{MM}/{filename}"
 * - Setup a file in path User > Desktop > My Coffee Journal > 2020 > August > 2020-08-01
 * - Update VSCode settings to target this path with JSON Schema validation
 * @todo Create migration from one folder structure to the other (because I need this!).
 * - "journal migrate --from --to" or have from/to as positional arguments
 * - Updates config after successful migration
 */

const __filename = fileURLToPath(import.meta.url);
const JOURNAL_ENTRIES_ABSOLUTE_PATH = resolve(
  dirname(__filename),
  '../../../entries'
);
const JOURNAL_ENTRIES_RELATIVE_PATH = relative(
  process.cwd(),
  JOURNAL_ENTRIES_ABSOLUTE_PATH
);
console.log(process.cwd(), JOURNAL_ENTRIES_RELATIVE_PATH);
const SCHEMA_PATH = resolve(dirname(__filename), '../../../schemas');

export const getEntryFilenames = pipeWith(andThen, [
  () => readdir(JOURNAL_ENTRIES_ABSOLUTE_PATH),
  filter(endsWith('.json')),
]);

export const getEntryByFilename = (filename) =>
  import(`${JOURNAL_ENTRIES_ABSOLUTE_PATH}/${filename}`).then(prop('default'));

export const getJSONSchema = curry(async (version, type) =>
  import(`${SCHEMA_PATH}/${type}_v${version}.json`).then(prop('default'))
);

export const getRelativeFilepathByEntryName = async (filename) => {
  const filepath = `${JOURNAL_ENTRIES_RELATIVE_PATH}/${filename}`;
  await access(filepath);
  return filepath;
};

export const writeEntry = curry(async (filename, entry) => {
  const filepath = `${JOURNAL_ENTRIES_ABSOLUTE_PATH}/${filename}`;
  await writeFile(filepath, JSON.stringify(entry, null, 2));
  return filepath;
});
