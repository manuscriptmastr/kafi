import dateFns from 'date-fns';
const { format, isToday } = dateFns;
import { promises as fs } from 'fs';
import R from 'ramda';
const { applySpec, head, join, last, map, pipe, pipeWith, split, sortBy, take, tap } = R;
import template from './template.json';

const filenameToDateArray = pipe(
  split('.json'),
  head,
  split('-'),
  ([month, day, year, iteration = '0']) => [year, month, day, iteration]
);

const dateArrayToFilename = ([year, month, day, iteration]) =>
  `${month}-${day}-${year}${iteration === '0' ? '' : `-${iteration}`}.json`;

const dateArrayToIteration = ([_, __, ___, iteration]) => Number(iteration);

const sortArrays = sortBy(join('-'));

const getMostRecentJournalEntry = pipe(
  map(filenameToDateArray),
  sortArrays,
  last,
  applySpec({
    filename: dateArrayToFilename,
    iteration: dateArrayToIteration,
    date: ([year, month, day]) => new Date(`${month}-${day}-${year}`)
  })
);

export const createJournalEntry = async () => {
  const filenames = await fs.readdir(`${process.cwd()}/entries`);
  const { filename, iteration, date } = getMostRecentJournalEntry(filenames);
  const { default: lastEntry } = await import(`../entries/${filename}`);
  const { coffee, equipment, ratio, grind, bloomTime } = lastEntry;
  const today = new Date();
  const newFilename = `${format(today, 'MM-dd-yyyy')}${isToday(date) ? `-${iteration + 1}` : ''}.json`;
  const newEntry = { ...template, date: format(today, 'MM/dd/yyyy'), coffee, equipment, ratio, grind, bloomTime };
  await fs.writeFile(`${process.cwd()}/entries/${newFilename}`, JSON.stringify(newEntry));
  console.log(`Wrote new entry: ${newFilename}.json`);
};
