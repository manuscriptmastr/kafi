import test from 'ava';
import { mostRecentFilename } from '.';

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
