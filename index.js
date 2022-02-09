#!/usr/bin/env node

const chokidar = require('chokidar');
const debounce = require('lodash.debounce');
const { program } = require('@caporal/core');

const log = console.log.bind(console);

program
  .version('0.0.1')
  .argument('[filename]', 'Name of file to execute')
  .action(({ args }) => {
    const start = debounce(() => {
      console.log('Starting user program');
    }, 100);

    // One-liner for current directory
    chokidar
      .watch('.')
      .on('add', start) // debounced to not spam for every file added as program starts
      .on('change', (path) => log(`File ${path} has been changed`))
      .on('unlink', (path) => log(`File ${path} has been removed`));
  });

program.run(process.argv.slice(2));
