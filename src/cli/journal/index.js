import newJournal from './new';

export default {
  command: 'journal',
  desc: 'Journal commands',
  builder: yargs => yargs
    .command(newJournal)
    .demandCommand()
};
