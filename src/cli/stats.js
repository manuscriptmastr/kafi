import { promises as fs } from 'fs';
import R from 'ramda';
const { andThen, curry, filter, map, pathEq, pick, pipeWith, prop, sortBy } = R;

const getEntryNames = () => fs.readdir(`${process.cwd()}/entries`);
const getEntryByName = name => import(`${process.cwd()}/entries/${name}`).then(prop('default'));

const mapAsync = curry((fn, arr) => Promise.all(map(fn, arr)));

export default {
  command: 'stats',
  desc: 'Analyze journal entries',
  builder: yargs => yargs
    .option('by', {
      describe: 'Sort results by field',
      type: 'string',
      default: 'score'
    })
    .option('fields', {
      describe: 'Fields to include',
      type: 'array',
      demandOption: true
    })
  ,
  handler: ({ by, fields }) => pipeWith(andThen, [
    getEntryNames,
    mapAsync(getEntryByName),
    filter(pathEq(['equipment', 'grinder'], 'Comandante C40 MKIII')),
    sortBy(prop(by)),
    map(pick(fields)),
    console.log
  ])()
};
