import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import R from 'ramda';
const {
  always,
  cond,
  defaultTo,
  head,
  match,
  pipe
} = R;
import { FILE_EXTENSION } from '../file';

dayjs.extend(isToday);

export const DATE_FORMAT = 'MM-DD-YYYY';
export const FRIENDLY_DATE_FORMAT = 'MM/DD/YYYY';

const DATE_FROM_FILENAME = `^\\d{2}-\\d{2}-\\d{4}(?=(-\\d+)?${FILE_EXTENSION}$)`;
const ITERATION_FROM_FILENAME = `(?<=^\\d{2}-\\d{2}-\\d{4}-)\\d+(?=${FILE_EXTENSION}$)`;

export const dateFromFilename = pipe(
  match(new RegExp(DATE_FROM_FILENAME)),
  head,
  str => dayjs(str, DATE_FORMAT)
);

export const iterationFromFilename = pipe(
  match(new RegExp(ITERATION_FROM_FILENAME)),
  head,
  defaultTo('0'),
  str => parseInt(str, 10)
);

export const dateComparator = cond([
  [(a, b) => a.isBefore(b, 'day'), always(-1)],
  [(a, b) => a.isSame(b, 'day'), always(0)],
  [(a, b) => a.isAfter(b, 'day'), always(1)],
]);
