import dayjs from 'dayjs';
import { mkdir, readFile, stat, writeFile } from 'fs/promises';
import CSV from 'json2csv';
import { dirname, resolve } from 'path';
import R from 'ramda';
import { flatEntries, parseDateTokenString, pathString } from '../util';
const { fromPairs, map, pipe, prop, unary } = R;

const csv = unary(CSV.parseAsync);

/**
 * @todo When tokens are used in the `from` argument, dynamically generate a folder of all entries
 */
export const command = 'export <from> <to>';
export const desc = 'Export journal entries';
export const builder = (yargs) =>
  yargs
    .positional('from', {
      describe: 'Path to journal entry',
      type: 'string',
      required: true,
    })
    .positional('to', {
      describe: 'Path to transformed journal entry',
      type: 'string',
      required: true,
    })
    .option('template', {
      describe: 'Path to template to transform journal entry',
      type: 'string',
      required: false,
    })
    .option('csv', {
      describe: 'Export as CSV',
      type: 'boolean',
      required: false,
      default: false,
    });
const _handler = async ({
  from,
  to: _to,
  csv: exportCSV,
  template: _template,
}) => {
  const entry = await import(resolve(process.cwd(), from)).then(
    prop('default')
  );
  const to = parseDateTokenString(_to, dayjs(entry.timestamp, 'X'));

  let newEntry = JSON.stringify(entry, null, 2);

  if (_template) {
    const template = await readFile(resolve(process.cwd(), _template), 'utf-8');
    newEntry = template.replaceAll(/{(.*?)}/g, (__, path) =>
      pathString(path, entry)
    );
  }

  if (exportCSV) {
    newEntry = await pipe(
      unary(flatEntries),
      map(([path, value]) => [
        path.join('.'),
        Array.isArray(value) ? value.join(', ') : value,
      ]),
      fromPairs,
      csv
    )(entry);
  }

  const filepath = resolve(process.cwd(), to);
  const dirpath = dirname(filepath);
  await mkdir(dirpath, { recursive: true });
  await writeFile(filepath, newEntry);
  console.log(`Wrote exported entry: ${filepath}`);
};

export const handler = async ({ from, ...rest }) => {
  const fileOrDirPath = resolve(process.cwd(), from);
  return (await stat(fileOrDirPath)).isDirectory()
    ? console.log('Wut?')
    : _handler({ from, ...rest });
};
