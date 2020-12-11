#!/usr/bin/env -S node --experimental-specifier-resolution=node --no-warnings
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import commands from './src/cli';

/**
 * @todo Change pourover => coffee-cli (or something catchy!) and pourover-cli to said catchy name
 * @todo coffee-cli journal [pourover|cupping]
 * @todo coffee-cli analyze [pourover|cupping]
 * @todo coffee-cli update [pourover|cupping]
 */

yargs(hideBin(process.argv))
  .command(commands)
  .demandCommand()
  .help()
  .argv
;
