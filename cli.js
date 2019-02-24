#!/usr/bin/env node
const {resolve} = require('path');
const Yargs = require('yargs');
const writeFile = require('fs-writefile-promise');
const run = require('./index');

const {file, path, chrome} = Yargs.command('$0 [path] [file]', 'Build HTML from a set of XML files', (yargs) => {
    yargs
        .positional('path', {
            describe: 'Path to XML files to process',
            default: '.'
        })
        .positional('file', {
            describe: 'Output file name',
            default: 'out.html'
        })
        .option('chrome', {
            describe: 'Chrome binary location',
            default: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
        })
}).help().argv;

run(path, {chrome}).then(async html => {
    await writeFile(resolve(file), html);
}).catch(e => {
    console.error(e);
    process.exit(1);
});


