#!/usr/bin/env -S node --experimental-specifier-resolution=node --no-warnings
import yargs from 'yargs';
import journal from './src/cli/journal';
import stats from './src/cli/stats';

/**
 * @todo Update Yargs to 16 and fix 'yargs.command is not a function' error
 * @todo Eventually we can replace .command with .commandDir in ESM
 * */

yargs
  .command(journal)
  .command(stats)
  .demandCommand()
  .help()
  .argv
;
