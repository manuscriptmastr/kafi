import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import R from 'ramda';
const {
  always,
  ascend,
  cond,
  defaultTo,
  head,
  last,
  match,
  pipe,
  sortWith,
  useWith
} = R;
import {
  getEntryByFilename,
  getEntryFilenames,
  writeEntry
} from '../../../util';
import template from '../../../template.json';

dayjs.extend(isToday);

export const DATE_FORMAT = 'MM-DD-YYYY';

export const dateFromFilename = pipe(
  match(/^\d{2}-\d{2}-\d{4}(?=(-\d+)?.json$)/),
  head,
  str => dayjs(str, DATE_FORMAT)
);

export const iterationFromFilename = pipe(
  match(/(?<=^\d{2}-\d{2}-\d{4}-)\d+(?=.json$)/),
  head,
  defaultTo('0'),
  str => parseInt(str, 10)
);

const dateComparator = cond([
  [(a, b) => a.isBefore(b, 'day'), always(-1)],
  [(a, b) => a.isSame(b, 'day'), always(0)],
  [(a, b) => a.isAfter(b, 'day'), always(1)],
]);

export const mostRecentFilename = pipe(
  sortWith([
    useWith(dateComparator, [dateFromFilename, dateFromFilename]),
    ascend(iterationFromFilename)
  ]),
  last
);

export const createJournalEntry = async () => {
  const filenames = await getEntryFilenames();
  const filename = mostRecentFilename(filenames);
  const iteration = iterationFromFilename(filename);
  const today = dayjs();

  let newFilename = `${today.format(DATE_FORMAT)}.json`;
  let newEntry = { ...template, date: today.format('MM/DD/YYYY') };

  if (filename) {
    const date = dateFromFilename(filename);
    const { coffee, equipment, ratio, grind, bloomTime, technique } = await getEntryByFilename(filename);

    newFilename = `${today.format(DATE_FORMAT)}${date.isToday() ? `-${iteration + 1}` : ''}.json`;
    newEntry = { ...newEntry, coffee, equipment, ratio, grind, bloomTime, technique };
  }

  await writeEntry(newFilename, newEntry);
  console.log(`Wrote new entry: ${newFilename}`);
};

export default {
  command: 'new',
  desc: 'Create a new journal entry',
  handler: createJournalEntry
};
