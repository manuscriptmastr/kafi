import test from 'ava';
import { sortFilenamesByDate } from '.';

test('mostRecentFilename(filenames) returns empty array when given an empty array', t => {
  t.deepEqual(sortFilenamesByDate([]), []);
});

test('mostRecentFilename(filenames) returns filenames from oldest to newest', t => {
  t.deepEqual(sortFilenamesByDate(['09-22-2020.json', '09-23-2020.json']), ['09-22-2020.json', '09-23-2020.json']);
  t.deepEqual(sortFilenamesByDate(['09-23-2020.json', '09-22-2020.json']), ['09-22-2020.json', '09-23-2020.json']);
  t.deepEqual(sortFilenamesByDate(['09-24-2020.json', '09-22-2020.json', '09-23-2020.json']), ['09-22-2020.json', '09-23-2020.json', '09-24-2020.json']);
  t.deepEqual(sortFilenamesByDate(['08-22-2020.json', '09-22-2019.json', '09-23-2019.json']), ['09-22-2019.json', '09-23-2019.json', '08-22-2020.json']);
});

test('mostRecentFilename(filenames) returns filenames from oldest to newest, with iteration', t => {
  t.deepEqual(sortFilenamesByDate(['09-22-2020.json', '09-22-2020-1.json']), ['09-22-2020.json', '09-22-2020-1.json']);
  t.deepEqual(sortFilenamesByDate(['09-22-2020-1.json', '09-22-2020.json']), ['09-22-2020.json', '09-22-2020-1.json']);
  t.deepEqual(sortFilenamesByDate(['09-22-2020-1.json', '09-22-2020-2.json']), ['09-22-2020-1.json', '09-22-2020-2.json']);
  t.deepEqual(sortFilenamesByDate(['09-23-2020.json', '09-19-2020-1.json']), ['09-19-2020-1.json', '09-23-2020.json']);
});
