import test from 'ava';
import dayjs from 'dayjs';
import { FILE_EXTENSION } from '../file';
import {
  DATE_FORMAT,
  dateFromFilename,
  iterationFromFilename,
  parseDateTokenString
} from '.';

test('dateFromFilename(filename) returns a DayJS date given a filename', t => {
  const NOW = dayjs();
  const FILENAME = `${NOW.format(DATE_FORMAT)}${FILE_EXTENSION}`
  t.true(dateFromFilename(FILENAME).isSame(NOW, 'day'));
});

test('dateFromFilename(filename) returns a DayJS date given a filename with an iteration', t => {
  const NOW = dayjs();
  const FILENAME_1 = `${NOW.format(DATE_FORMAT)}-1${FILE_EXTENSION}`;
  const FILENAME_2 = `${NOW.format(DATE_FORMAT)}-999${FILE_EXTENSION}`;
  t.true(dateFromFilename(FILENAME_1).isSame(NOW, 'day'));
  t.true(dateFromFilename(FILENAME_2).isSame(NOW, 'day'));
});

test('iterationFromFilename(filename) returns 0 given a filename without an iteration', t => {
  const NOW = dayjs();
  const FILENAME = `${NOW.format(DATE_FORMAT)}${FILE_EXTENSION}`;
  t.deepEqual(iterationFromFilename(FILENAME), 0);
});

test('iterationFromFilename(filename) returns 0 given a filename with an iteration of 0', t => {
  const NOW = dayjs();
  const FILENAME = `${NOW.format(DATE_FORMAT)}-0${FILE_EXTENSION}`;
  t.deepEqual(iterationFromFilename(FILENAME), 0);
});

test('iterationFromFilename(filename) returns a number given a filename with an iteration', t => {
  const NOW = dayjs();
  const FILENAME = `${NOW.format(DATE_FORMAT)}-3${FILE_EXTENSION}`;
  t.deepEqual(iterationFromFilename(FILENAME), 3);
});

test('parseDateTokenString(string, date) returns string as is if no tokens are found', t => {
  t.deepEqual(parseDateTokenString('just/a/string', dayjs()), 'just/a/string');
  t.deepEqual(parseDateTokenString('just/a/{}/string', dayjs()), 'just/a/{}/string');
});

test('parseDateTokenString(string, date) returns string with date tokens replaced', t => {
  t.deepEqual(parseDateTokenString('path/{YYYY}/{MM}/{DD}', dayjs('02-03-2020', 'MM-DD-YYYY')), 'path/2020/02/03');
});
