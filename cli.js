#!/usr/bin/env node
const Yargs = require('yargs');
const run = require('./index');

const {path} = Yargs.command('$0 [path]', 'Build HTML from a set of XML files', (yargs) => {
    yargs.positional('path', {
            describe: 'Path to XML files to process',
            default: '.'
        });
}).help().argv;

run(path).catch(e => {
    console.error(e);
    process.exit(1);
});


