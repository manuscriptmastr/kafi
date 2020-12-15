import R from 'ramda';
const {
  andThen,
  pipeWith
} = R;
import {
  getEntryByFilename,
  getEntryFilenames,
  mapAsync,
  schema0ToSchema1,
  writeEntry
} from '../util';

export const command = 'update <type>';
export const desc = 'Update journal entries to different schemas';
export const builder = yargs => yargs
  .positional('type', {
    describe: 'Type of journal entry',
    type: 'string',
    choices: ['pourover', 'cupping'],
    required: true
  })
  .option('from', {
    describe: 'From schema version',
    type: 'string',
    required: true
  })
  .option('to', {
    describe: 'To schema version',
    type: 'string',
    required: true
  });
export const handler = ({ type, from, to }) => pipeWith(andThen, [
  getEntryFilenames,
  mapAsync(async filename => {
    const entry = await getEntryByFilename(filename);
    const newEntry = schema0ToSchema1(entry);
    await writeEntry(filename, newEntry)
  })
])();
