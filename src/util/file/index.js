import { promises as fs } from 'fs';
import R from 'ramda';
const {
  curry,
  prop,
} = R;

/**
 * Todo:
 * - Auto-stores files in year/month folders.
 * - Stretch goal: how can I separate the date an entry was written
 *   from the definition of how to store and name it?
 *   E.g. treating journal organization as a user property:
 *   - Given a date of August 1, 2020
 *   - And a user-defined env variable such as FILEPATH="~/Desktop/My Coffee Journal/{YY}/{MM}/{filename}"
 *   - Setup a file in path User > Desktop > My Coffee Journal > 2020 > August > 2020-08-01
 */

const EXTENSION = '.json';
const DEFAULT_PATH = `${process.cwd()}/entries/{filename}`;

export const getEntryFilenames = () => fs.readdir(`${process.cwd()}/entries`);

export const getEntryByFilename = filename =>
  import(`${process.cwd()}/entries/${filename}`)
    .then(prop('default'));

export const writeEntry = curry((filename, entry) =>
  fs.writeFile(`${process.cwd()}/entries/${filename}`, JSON.stringify(entry, null, 2))
);
