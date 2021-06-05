/**
 * @todo Wire up update <type> command,
 * also combine schema transforms with defaults from JSON Schema when a transform returns undefined
 * @todo Assume user can only go forward. If --to is earlier than the journal entry, we should throw
 */

export const command = 'update <type>';
export const desc = 'Update journal entries to different schemas';
export const builder = (yargs) =>
  yargs
    .positional('type', {
      describe: 'Type of journal entry',
      type: 'string',
      choices: ['cupping', 'hybrid', 'pourover'],
      required: true,
    })
    .option('from', {
      describe: 'From schema version',
      type: 'string',
      required: true,
    })
    .option('to', {
      describe: 'To schema version',
      type: 'string',
      required: true,
    });
export const handler = ({ type, from, to }) => {};
