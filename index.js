#!/usr/bin/env -S node --experimental-specifier-resolution=node
import yargs from 'yargs';
import { createJournalEntry } from './src/journal';

yargs
  .usage('Usage: $0 new')
  .command('new', 'creates a new journal entry', createJournalEntry)
  .recommendCommands()
  .demandCommand()
  .help()
  .argv
;
