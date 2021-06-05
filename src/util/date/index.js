import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isToday from 'dayjs/plugin/isToday';
import R from 'ramda';
const { always, cond, curry, head, match, nthArg, pipe, replace } = R;

dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(isToday);

/**
 * @todo dayjs should only ever be referenced in this file.
 */

export const DATE_FORMAT = 'X';
export const FRIENDLY_DATE_FORMAT = 'MM/DD/YYYY';

const DATE_FROM_FILENAME = `^\\d+(?=.json$)`;
const TOKEN = /{([a-zA-Z]+?)}/g;

export const dateFromFriendlyDate = (str) => dayjs(str, FRIENDLY_DATE_FORMAT);

export const dateComparator = cond([
  [(a, b) => a.isBefore(b, 'day'), always(-1)],
  [(a, b) => a.isSame(b, 'day'), always(0)],
  [(a, b) => a.isAfter(b, 'day'), always(1)],
]);

export const parseDateTokenString = curry((pattern, date) =>
  replace(
    TOKEN,
    pipe(nthArg(1), (match) => date.format(match)),
    pattern
  )
);
