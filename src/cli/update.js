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

export default {
  command: 'update',
  desc: 'Update journal entries to different schemas',
  builder: yargs => yargs
    .option('from', {
      describe: 'From schema version',
      type: 'string',
      required: true
    })
    .option('to', {
      describe: 'To schema version',
      type: 'string',
      required: true
    })
  ,
  handler: ({ from, to }) => pipeWith(andThen, [
    getEntryFilenames,
    mapAsync(async filename => {
      const entry = await getEntryByFilename(filename);
      const newEntry = schema0ToSchema1(entry);
      await writeEntry(filename, newEntry)
    })
  ])()
};
