import test from 'ava';
import dayjs from 'dayjs';
import { parseDateTokenString } from '.';

test('parseDateTokenString(string, date) returns string as is if no tokens are found', (t) => {
  t.deepEqual(parseDateTokenString('just/a/string', dayjs()), 'just/a/string');
  t.deepEqual(
    parseDateTokenString('just/a/{}/string', dayjs()),
    'just/a/{}/string'
  );
});

test('parseDateTokenString(string, date) returns string with date tokens replaced', (t) => {
  t.deepEqual(
    parseDateTokenString('path/{YYYY}/{MM}/{DD}', dayjs('02-03-2020')),
    'path/2020/02/03'
  );
  t.deepEqual(
    parseDateTokenString('path/{YYYY}/{MM}/{DD}/{HH}', dayjs('02-03-2020')),
    'path/2020/02/03/00'
  );
  t.deepEqual(
    parseDateTokenString(
      'path/{YYYY}/{MM}/{DD}/{HH}',
      dayjs('02-03-2020').add(1, 'hour')
    ),
    'path/2020/02/03/01'
  );
});
