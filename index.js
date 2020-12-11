#!/usr/bin/env -S node --experimental-specifier-resolution=node --no-warnings
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import commands from './src/cli';

/**
 * @todo Change pourover => coffee-cli (or something catchy!) and pourover-cli to said catchy name
 * @todo coffee-cli [pourover|cupping] journal
 * @todo coffee-cli [pourover|cupping] stats
 * @todo coffee-cli [pourover|cupping] update
 */

yargs(hideBin(process.argv))
  .command(commands)
  .demandCommand()
  .help()
  .argv
;
