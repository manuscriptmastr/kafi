#!/usr/bin/env -S node --experimental-specifier-resolution=node --no-warnings
import 'dotenv/config';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import commands from './src/cli';

yargs(hideBin(process.argv)).command(commands).demandCommand().help().argv;
