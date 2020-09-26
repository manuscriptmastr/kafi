import test from 'ava';
import { partialEq } from '.';

test('partialEq(partial, object) returns true when partial is empty object', t => {
  t.true(partialEq({}, { hello: 'world' }));
});

test('partialEq(partial, object) returns false when one shallow property does not match object', t => {
  t.false(partialEq({ hello: 'there' }, { hello: 'world' }));
  t.false(partialEq({ hello: 'world', yo: 'yeet' }, { hello: 'world' }));
});

test('partialEq(partial, object) returns true when all shallow properties match object', t => {
  t.true(partialEq({ hello: 'world', yo: 'yeet' }, { hello: 'world', yo: 'yeet' }));
  t.true(partialEq({ hello: 'world', yo: 'yeet' }, { hello: 'world', yo: 'yeet', hey: 'there' }));
});

test('partialEq(partial, object) returns false when a nested property does not match object', t => {
  t.false(partialEq({ hello: { there: 'world' } }, { hello: 'world' }));
  t.false(partialEq({ hello: { there: 42 } }, { hello: { there: 'world' } }));
});

test('partialEq(partial, object) returns true when all nested properties match object', t => {
  t.true(partialEq({ hello: { there: 'world' } }, { hello: { there: 'world' } }));
  t.true(partialEq({ hello: { there: 'world' } }, { hello: { there: 'world' }, yo: 'yeet' }));
});

test('partialEq(partial, object returns true when object contains other nested properties', t => {
  t.true(partialEq({ hello: { there: 'world' }, yo: { yay: 'yeet' } }, { hello: { there: 'world' }, yo: { yay: 'yeet', random: 'hello' } }));
  t.true(partialEq({ a: { b: 'c', d: 'e' } }, { a: { b: 'c', d: 'e', f: 'g' }, b: 'c' }));
});
