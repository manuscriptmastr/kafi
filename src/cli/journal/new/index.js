import dayjs from 'dayjs';
import defaults from 'json-schema-defaults';
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
  FRIENDLY_DATE_FORMAT,
  getEntryByFilename,
  getEntryFilenames,
  iterationFromFilename,
  writeEntry
} from '../../../util';
import SCHEMA from '../../../schema/pourover_v1.0.json';

const DEFAULT_FIELDS = ['coffee', 'water', 'equipment', 'recipe', 'actionItem'];

export const mostRecentFilename = pipe(
  sortWith([
    useWith(dateComparator, [dateFromFilename, dateFromFilename]),
    ascend(iterationFromFilename)
  ]),
  last
);

const createJournalEntry = async () => {
  const today = dayjs();
  let basename = today.format(DATE_FORMAT);
  let entry = { ...defaults(SCHEMA), date: today.format(FRIENDLY_DATE_FORMAT) };

  const filenames = await getEntryFilenames();
  const filename = mostRecentFilename(filenames);

  if (filename) {
    const date = dateFromFilename(filename);
    const iteration = iterationFromFilename(filename);
    const lastEntry = await getEntryByFilename(filename);

    basename = `${basename}${date.isToday() ? `-${iteration + 1}` : ''}`;
    entry = { ...entry, ...pick(DEFAULT_FIELDS, lastEntry) };
  }

  const filepath = await writeEntry(`${basename}.json`, entry);
  console.log(`Wrote new entry: ${filepath}`);
};

export default {
  command: 'new',
  desc: 'Create a new journal entry',
  handler: createJournalEntry
};
