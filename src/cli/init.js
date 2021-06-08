import { writeFile } from 'fs/promises';
import { ROOT_DIR } from '../util';

export const command = 'init';
export const desc = 'Create a new journal entry';
export const builder = (yargs) =>
  yargs.option('path', {
    describe: 'Structure of journal',
    type: 'string',
    default: `${process.cwd()}/entries/{X}.json`,
  });
export const handler = async ({ path }) => {
  const ENV_PATH = `${ROOT_DIR}/.env`;
  await writeFile(ENV_PATH, `FILEPATH=${path}`, 'utf-8');
  console.log(`Initialized journal at: ${process.cwd()}`);
};
