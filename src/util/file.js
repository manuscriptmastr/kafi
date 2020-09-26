import { promises as fs } from 'fs';
import R from 'ramda';
const {
  curry,
  prop,
} = R;

export const getEntryFilenames = () => fs.readdir(`${process.cwd()}/entries`);

export const getEntryByFilename = filename =>
  import(`${process.cwd()}/entries/${filename}`)
    .then(prop('default'));

export const writeEntry = curry((filename, entry) =>
  fs.writeFile(`${process.cwd()}/entries/${filename}`, JSON.stringify(entry, null, 2))
);
