#!/usr/bin/env -S node --experimental-specifier-resolution=node
import yargs from 'yargs';
import journal from './src/cli/journal';
import stats from './src/cli/stats';

// TODO: Eventually we can replace .command with .commandDir in ESM
yargs
  .command(journal)
  .command(stats)
  .demandCommand()
  .help()
  .argv
;
