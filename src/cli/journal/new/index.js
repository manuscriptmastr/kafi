import dayjs from 'dayjs';
import R from 'ramda';
const {
  ascend,
  last,
  pick,
  pipe,
  sortWith,
  useWith
} = R;
import {
  DATE_FORMAT,
  dateComparator,
  dateFromFilename,
  FILE_EXTENSION,
  FRIENDLY_DATE_FORMAT,
  getEntryByFilename,
  getEntryFilenames,
  iterationFromFilename,
  writeEntry
} from '../../../util';
import template from '../../../template.json';

const DEFAULT_FIELDS = ['coffee', 'equipment', 'ratio', 'grind', 'bloomTime', 'technique', 'actionItem'];

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

  let basename = today.format(DATE_FORMAT);
  let entry = { ...template, date: today.format(FRIENDLY_DATE_FORMAT) };

  if (filename) {
    const date = dateFromFilename(filename);
    const lastEntry = await getEntryByFilename(filename);

    basename = `${basename}${date.isToday() ? `-${iteration + 1}` : ''}`;
    entry = { ...entry, ...pick(DEFAULT_FIELDS, lastEntry) };
  }

  const filepath = await writeEntry(`${basename}${FILE_EXTENSION}`, entry);
  console.log(`Wrote new entry: ${filepath}`);
};

export default {
  command: 'new',
  desc: 'Create a new journal entry',
  handler: createJournalEntry
};
