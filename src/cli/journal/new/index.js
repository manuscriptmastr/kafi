import dayjs from 'dayjs';
import R from 'ramda';
const {
  ascend,
  last,
  pipe,
  sortWith,
  useWith
} = R;
import {
  DATE_FORMAT,
  dateComparator,
  dateFromFilename,
  getEntryByFilename,
  getEntryFilenames,
  iterationFromFilename,
  writeEntry
} from '../../../util';
import template from '../../../template.json';

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
