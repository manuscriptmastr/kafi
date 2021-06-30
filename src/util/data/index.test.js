import test from 'ava';
import { flatEntries, partialEq, pathString } from '.';

test('flattenObject(object) returns original value when not an array or object', (t) => {
  t.deepEqual(flatEntries(undefined), [[[], undefined]]);
  t.deepEqual(flatEntries(null), [[[], null]]);
  t.deepEqual(flatEntries(1), [[[], 1]]);
  t.deepEqual(flatEntries('hello'), [[[], 'hello']]);
});

test('flattenObject(object) returns array with single path/value pair', (t) => {
  t.deepEqual(flatEntries({ hello: 'world' }), [[['hello'], 'world']]);
});

test('flattenObject(object) returns array with more than one path/value pair', (t) => {
  t.deepEqual(flatEntries({ hello: 'world', yo: 'yeet' }), [
    [['hello'], 'world'],
    [['yo'], 'yeet'],
  ]);
});

test('flattenObject(object) allows single nested property', (t) => {
  t.deepEqual(flatEntries({ hello: 'world', yo: { yada: 'yeet' } }), [
    [['hello'], 'world'],
    [['yo', 'yada'], 'yeet'],
  ]);
});

test('flattenObject(object) allows multiple nested properties', (t) => {
  t.deepEqual(
    flatEntries({ hello: 'world', yo: { yada: 'yeet', yoda: 'yacht' } }),
    [
      [['hello'], 'world'],
      [['yo', 'yada'], 'yeet'],
      [['yo', 'yoda'], 'yacht'],
    ]
  );
});

test('pathString(string) returns undefined when passed an empty string', (t) => {
  t.deepEqual(pathString('', { a: 1 }), undefined);
});

test('pathString(string) returns undefined when passed a string that is not a valid path', (t) => {
  t.deepEqual(pathString('b', { a: 1 }), undefined);
});

test('pathString(string) returns value when passed a string that is a valid key', (t) => {
  t.deepEqual(pathString('a', { a: 1 }), 1);
});

test('pathString(string) returns value when passed a string that is a valid path', (t) => {
  t.deepEqual(pathString('a.b.c', { a: { b: { c: 1 } } }), 1);
});

test('pathString accepts curried arguments', (t) => {
  t.deepEqual(pathString('a.b.c')({ a: { b: { c: 1 } } }), 1);
});

test('partialEq(partial, object) returns true when partial is empty object', (t) => {
  t.true(partialEq({}, { hello: 'world' }));
});

test('partialEq(partial, object) returns false when one shallow property does not match object', (t) => {
  t.false(partialEq({ hello: 'there' }, { hello: 'world' }));
  t.false(partialEq({ hello: 'world', yo: 'yeet' }, { hello: 'world' }));
});

test('partialEq(partial, object) returns true when all shallow properties match object', (t) => {
  t.true(
    partialEq({ hello: 'world', yo: 'yeet' }, { hello: 'world', yo: 'yeet' })
  );
  t.true(
    partialEq(
      { hello: 'world', yo: 'yeet' },
      { hello: 'world', yo: 'yeet', hey: 'there' }
    )
  );
});

test('partialEq(partial, object) returns false when a nested property does not match object', (t) => {
  t.false(partialEq({ hello: { there: 'world' } }, { hello: 'world' }));
  t.false(partialEq({ hello: { there: 42 } }, { hello: { there: 'world' } }));
});

test('partialEq(partial, object) returns true when all nested properties match object', (t) => {
  t.true(
    partialEq({ hello: { there: 'world' } }, { hello: { there: 'world' } })
  );
  t.true(
    partialEq(
      { hello: { there: 'world' } },
      { hello: { there: 'world' }, yo: 'yeet' }
    )
  );
});

test('partialEq(partial, object returns true when object contains other nested properties', (t) => {
  t.true(
    partialEq(
      { hello: { there: 'world' }, yo: { yay: 'yeet' } },
      { hello: { there: 'world' }, yo: { yay: 'yeet', random: 'hello' } }
    )
  );
  t.true(
    partialEq(
      { a: { b: 'c', d: 'e' } },
      { a: { b: 'c', d: 'e', f: 'g' }, b: 'c' }
    )
  );
});

test('partialEq(partial, object returns true when single property is in array property', (t) => {
  t.true(
    partialEq({ a: { b: 'c', d: 'e' } }, { a: { b: 'c', d: ['e', 'f', 'g'] } })
  );
});

test('partialEq(partial, object returns true when an array property is fully included in an array property', (t) => {
  t.true(
    partialEq(
      { a: { b: 'c', d: ['e', 'g'] } },
      { a: { b: 'c', d: ['e', 'f', 'g'] } }
    )
  );
});

test('partialEq(partial, object returns false when an array property is only partially included an array property', (t) => {
  t.false(
    partialEq(
      { a: { b: 'c', d: ['e', 'h'] } },
      { a: { b: 'c', d: ['e', 'f', 'g'] } }
    )
  );
});
