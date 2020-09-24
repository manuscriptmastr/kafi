import test from 'ava';
import dayjs from 'dayjs';
import {
  DATE_FORMAT,
  dateFromFilename,
  iterationFromFilename,
  mostRecentFilename
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

test('mostRecentFilename(filenames) returns undefined when given an empty array', t => {
  t.deepEqual(mostRecentFilename([]), undefined);
});

test('mostRecentFilename(filenames) returns most recent filename', t => {
  t.deepEqual(mostRecentFilename(['09-22-2020.json', '09-23-2020.json']), '09-23-2020.json');
  t.deepEqual(mostRecentFilename(['09-23-2020.json', '09-22-2020.json']), '09-23-2020.json');
  t.deepEqual(mostRecentFilename(['09-24-2020.json', '09-22-2020.json', '09-23-2020.json']), '09-24-2020.json');
  t.deepEqual(mostRecentFilename(['08-22-2020.json', '09-22-2019.json', '09-23-2019.json']), '08-22-2020.json');
});

test('mostRecentFilename(filenames) returns most recent filename and iteration', t => {
  t.deepEqual(mostRecentFilename(['09-22-2020.json', '09-22-2020-1.json']), '09-22-2020-1.json');
  t.deepEqual(mostRecentFilename(['09-22-2020-1.json', '09-22-2020.json']), '09-22-2020-1.json');
  t.deepEqual(mostRecentFilename(['09-22-2020-1.json', '09-22-2020-2.json']), '09-22-2020-2.json');
  t.deepEqual(mostRecentFilename(['09-23-2020.json', '09-19-2020-1.json']), '09-23-2020.json');
});
