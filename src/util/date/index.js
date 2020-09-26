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

export const dateComparator = cond([
  [(a, b) => a.isBefore(b, 'day'), always(-1)],
  [(a, b) => a.isSame(b, 'day'), always(0)],
  [(a, b) => a.isAfter(b, 'day'), always(1)],
]);
