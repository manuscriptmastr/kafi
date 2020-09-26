export * from './data';
export * from './date';
export * from './file';
export * from './prettify';

/**
 * Todo:
 * - Auto-stores files in year/month folders.
 * - Stretch goal: how can I separate the date an entry was written
 *   from the definition of how to store and name it?
 *   E.g. treating journal organization as a user property:
 *   - Given a date of August 1, 2020
 *   - And a user-defined folder organization ['YYYY', 'M', 'YYYY-MM-DD'] with a sane default
 *   - Setup a file in path 2020 > August > 2020-08-01
 */
