import test from 'ava';
import dayjs from 'dayjs';
import {
  DATE_FORMAT,
  dateFromFilename,
  iterationFromFilename
} from '.';

test('dateFromFilename(filename) returns a DayJS date given a filename', t => {
  const NOW = dayjs();
  const FILENAME = `${NOW.format(DATE_FORMAT)}.json`
  t.true(dateFromFilename(FILENAME).isSame(NOW, 'day'));
});

test('dateFromFilename(filename) returns a DayJS date given a filename with an iteration', t => {
  const NOW = dayjs();
  const FILENAME_1 = `${NOW.format(DATE_FORMAT)}-1.json`;
  const FILENAME_2 = `${NOW.format(DATE_FORMAT)}-999.json`;
  t.true(dateFromFilename(FILENAME_1).isSame(NOW, 'day'));
  t.true(dateFromFilename(FILENAME_2).isSame(NOW, 'day'));
});

test('iterationFromFilename(filename) returns 0 given a filename without an iteration', t => {
  const NOW = dayjs();
  const FILENAME = `${NOW.format(DATE_FORMAT)}.json`;
  t.deepEqual(iterationFromFilename(FILENAME), 0);
});

test('iterationFromFilename(filename) returns 0 given a filename with an iteration of 0', t => {
  const NOW = dayjs();
  const FILENAME = `${NOW.format(DATE_FORMAT)}-0.json`;
  t.deepEqual(iterationFromFilename(FILENAME), 0);
});

test('iterationFromFilename(filename) returns a number given a filename with an iteration', t => {
  const NOW = dayjs();
  const FILENAME = `${NOW.format(DATE_FORMAT)}-3.json`;
  t.deepEqual(iterationFromFilename(FILENAME), 3);
});
