import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import { promises as fs } from 'fs';
import R from 'ramda';
const { always, applySpec, head, ifElse, join, last, map, pipe, prop, split, sortBy } = R;
import template from '../../template.json';

dayjs.extend(isToday);

/**
 * TODO:
 * - Rewrite README to reflect new findings (e.g. how does high agitation affect extraction?)
 */

const filenameToDateArray = pipe(
  split('.json'),
  head,
  split('-'),
  ([month, day, year, iteration = '0']) => [year, month, day, iteration]
);

const dateArrayToFilename = ([year, month, day, iteration]) =>
  `${month}-${day}-${year}${iteration === '0' ? '' : `-${iteration}`}.json`;

const dateArrayToIteration = ([_, __, ___, iteration]) => Number(iteration);

const dateArrayToObject = applySpec({
  filename: dateArrayToFilename,
  iteration: dateArrayToIteration,
  date: ([year, month, day]) => dayjs(`${month}-${day}-${year}`, FORMAT)
});

const sortArrays = sortBy(join('-'));

const FORMAT = 'MM-DD-YYYY';

const getMostRecentJournalEntry = pipe(
  map(filenameToDateArray),
  sortArrays,
  last,
  ifElse(K => !!K, dateArrayToObject, always({ filename: null, iteration: null, date: null })),
);

export const createJournalEntry = async () => {
  const filenames = await fs.readdir(`${process.cwd()}/entries`);
  const { filename, iteration, date } = getMostRecentJournalEntry(filenames);

  const today = dayjs();

  let newFilename = `${today.format(FORMAT)}.json`;
  let newEntry = { ...template, date: today.format('MM/DD/YYYY') };

  if (filename) {
    const { default: lastEntry } = await import(`${process.cwd()}/entries/${filename}`);
    const { coffee, equipment, ratio, grind, bloomTime, technique } = lastEntry;

    newFilename = `${today.format(FORMAT)}${date.isToday() ? `-${iteration + 1}` : ''}.json`;
    newEntry = { ...newEntry, coffee, equipment, ratio, grind, bloomTime, technique };
  }

  await fs.writeFile(`${process.cwd()}/entries/${newFilename}`, JSON.stringify(newEntry));
  console.log(`Wrote new entry: ${newFilename}`);
};

export default {
  command: 'new',
  desc: 'Create a new journal entry',
  handler: createJournalEntry
};
