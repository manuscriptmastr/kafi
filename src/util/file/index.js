import { promises as fs } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import R from 'ramda';
const {
  curry,
  prop
} = R;

/**
 * @todo Filepath is passed in by user but has a sane default in codebase.
 * - Given a date of August 1, 2020
 * - And a user-defined env variable such as PATTERN="~/Desktop/My Coffee Journal/{YY}/{MM}/{filename}"
 * - Setup a file in path User > Desktop > My Coffee Journal > 2020 > August > 2020-08-01
 * - Update VSCode settings to target this path with JSON Schema validation
 * @todo Create migration from one folder structure to the other (because I need this!).
 * - "pourover journal migrate --from --to" or have from/to as positional arguments
 * - Updates config after successful migration
 * @todo Create script to update all entries based on a schema change (e.g. adding keywords, which defaults to an empty array)
 * @todo Dynamically generate JSON Schema to lift out complex patterns and other behavior. Libraries?
 */

const __filename = fileURLToPath(import.meta.url);
const PROJECT_PATH = resolve(dirname(__filename), '../../../entries');

export const getEntryFilenames = () => fs.readdir(PROJECT_PATH);

export const getEntryByFilename = filename =>
  import(`${PROJECT_PATH}/${filename}`)
    .then(prop('default'));

export const writeEntry = curry(async (filename, entry) => {
  const filepath = `${PROJECT_PATH}/${filename}`;
  await fs.writeFile(filepath, JSON.stringify(entry, null, 2));
  return filepath;
});
