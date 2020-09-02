export default {
  command: 'stats',
  desc: 'Analyze journal entries',
  builder: yargs => yargs
    .option('by', {
      describe: 'Sort results by field',
      type: 'string',
      default: 'flavor'
    })
    .option('fields', {
      describe: 'Fields to include',
      type: 'array',
      demandOption: true
    })
  ,
  handler: console.log
};
