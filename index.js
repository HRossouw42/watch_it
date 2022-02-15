#!/usr/bin/env node

const chokidar = require('chokidar');
const debounce = require('lodash.debounce');
const { program } = require('@caporal/core');
const fs = require('fs');

const log = console.log.bind(console);

program
  .version('0.0.1')
  .argument('[filename]', 'Name of file to execute')
  .action(async ({ args }) => {
    // check if file exists
    const name = args.filename || 'index.js';
    try {
      await fs.promises.access(name);
    } catch (err) {
      throw new Error(`Could not find file: ${name}`);
    }

    // debounce function to prevent file added spam
    const start = debounce(() => {
      console.log('Starting user program');
    }, 100);

    // One-liner for current directory
    chokidar
      .watch('.')
      .on('add', start)
      .on('change', (path) => log(`File ${path} has been changed`))
      .on('unlink', (path) => log(`File ${path} has been removed`));
  });

program.run(process.argv.slice(2));
