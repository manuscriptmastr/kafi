import { mkdir, readFile, writeFile } from 'fs/promises';
import { dirname, resolve } from 'path';
import R from 'ramda';
import {
  dateFromFriendlyDate,
  parseDateTokenString,
  pathString
} from '../util';
const { prop } = R;

/**
 * @todo When tokens are used in the `from` argument, dynamically generate a folder of all entries
 */
export const command = 'export <from> <to>';
export const desc = 'Export journal entries';
export const builder = yargs => yargs
  .positional('from', {
    describe: 'Path to journal entry',
    type: 'string',
    required: true
  })
  .positional('to', {
    describe: 'Path to transformed journal entry',
    type: 'string',
    required: true
  })
  .option('template', {
    describe: 'Path to template to transform journal entry',
    type: 'string',
    required: true
  });
export const handler = async ({ from, to: _to, template: _template }) => {
  const entry = await import(resolve(process.cwd(), from)).then(prop('default'));
  const to = parseDateTokenString(_to, dateFromFriendlyDate(entry.date), entry.iteration);
  const template = await readFile(resolve(process.cwd(), _template), 'utf-8');
  const transformedEntry = template.replaceAll(/{(.*?)}/g, (__, path) => pathString(path, entry));
  const filepath = resolve(process.cwd(), to);
  const dirpath = dirname(filepath);
  await mkdir(dirpath, { recursive: true });
  await writeFile(filepath, transformedEntry);
  console.log(`Wrote exported entry: ${filepath}`);
};
