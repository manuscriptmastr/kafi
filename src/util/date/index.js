import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isToday from 'dayjs/plugin/isToday';
import R from 'ramda';
const {
  always,
  cond,
  curry,
  defaultTo,
  head,
  match,
  nthArg,
  pipe,
  replace
} = R;

dayjs.extend(customParseFormat);
dayjs.extend(isToday);

/**
 * @todo dayjs should only ever be referenced in this file.
 */

export const DATE_FORMAT = 'MM-DD-YYYY';
export const FRIENDLY_DATE_FORMAT = 'MM/DD/YYYY';

const DATE_FROM_FILENAME = `^\\d{2}-\\d{2}-\\d{4}(?=(-\\d+)?.json$)`;
const ITERATION_FROM_FILENAME = `(?<=^\\d{2}-\\d{2}-\\d{4}-)\\d+(?=.json$)`;
const TOKEN = /\{([\w-]+)\}/g;

export const dateFromFilename = pipe(
  match(new RegExp(DATE_FROM_FILENAME)),
  head,
  str => dayjs(str, DATE_FORMAT)
);

export const dateFromFriendlyDate = str => dayjs(str, FRIENDLY_DATE_FORMAT);

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

export const parseDateTokenString = curry((pattern, date) =>
  replace(TOKEN, pipe(nthArg(1), match => date.format(match)), pattern)
);
