#!/usr/bin/env node

const chokidar = require('chokidar');
const debounce = require('lodash.debounce');
const { program } = require('@caporal/core');
const fs = require('fs');
const { spawn } = require('child_process');

const log = console.log.bind(console);
const chalk = require('chalk');

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

    let childProc;
    // debounce function to prevent file added spam
    const start = debounce(() => {
      //spawn runs argument as child process, stdio option ensures stdin/out/err are inherited by parent program
      if (childProc) {
        childProc.kill();
        log(chalk.green('>>> Restarting process:', '\n'));
      }
      log(chalk.green('>>> Starting process:', '\n'));
      childProc = spawn('node', [name], { stdio: 'inherit' });
    }, 100);

    // One-liner for current directory
    chokidar
      .watch('.')
      .on('add', start)
      .on('change', start)
      .on('unlink', start);
  });

program.run(process.argv.slice(2));
