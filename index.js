const puppeteer = require('puppeteer-core');
const {resolve} = require('path');
const {readdirSync, unlinkSync} = require('fs');
const readFile = require('fs-readfile-promise');
const writeFile = require('fs-writefile-promise');
const Server = require('static-server');
const cliProgress = require('cli-progress');

const run = async (xmlDir = './xml') => {
    const bar = new cliProgress.Bar({
        stopOnComplete: true,
        clearOnComplete: true
    }, cliProgress.Presets.shades_classic);
    var server = new Server({
        rootPath: '.',
        port: 3000,
        cors: '*'
    });
    await new Promise(resolve => server.start(resolve));

    const browser = await puppeteer.launch({
        executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
    });
    const page = await browser.newPage();
    const re = /href="(.*?)Common.xsl"/g;
    const files = readdirSync(resolve(xmlDir)).filter(file => file.endsWith('.xml'));
    let outHtml = '';
    const tmpPath = resolve('tmp.xml');
    bar.start(files.length, 0);
    for (let i = 0; i < files.length; i++) {
        const filePath = resolve(xmlDir, files[i]);
        const file = (await readFile(filePath)).toString('utf-8').replace(re, 'href="/Common.xsl"');
        await writeFile(tmpPath, file);
        await page.goto(`http://localhost:3000/tmp.xml`);
        if (i === 0) {
            const headHandle = await page.$('head');
            const head = await page.evaluate(head => head.innerHTML, headHandle);
            await headHandle.dispose();
            outHtml += head;
        }

        const bodyHandle = await page.$('body');
        const body = await page.evaluate(body => body.innerHTML, bodyHandle);
        await bodyHandle.dispose();
        outHtml += body;
        bar.update(i+1);
    }
    outHtml = `<html lang="ru">${outHtml}</html>`;
    unlinkSync(tmpPath);
    await writeFile(resolve('out.html'), outHtml);
    await browser.close();
    server.stop();
};

run();