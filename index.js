#!/usr/bin/env -S node --experimental-specifier-resolution=node --no-warnings
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import journal from './src/cli/journal';
import stats from './src/cli/stats';

/**
 * @todo Eventually we can replace .command with .commandDir in ESM
 * */

yargs(hideBin(process.argv))
  .command(journal)
  .command(stats)
  .demandCommand()
  .help()
  .argv
;
