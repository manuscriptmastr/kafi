import * as newJournal from './new';

export const command = 'journal';
export const desc = 'Journal commands';
export const builder = yargs => yargs
  .command(newJournal)
  .demandCommand()
