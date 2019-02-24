const puppeteer = require('puppeteer-core');
const {resolve, basename} = require('path');
const {readdirSync} = require('fs');
const readFile = require('fs-readfile-promise');
const writeFile = require('fs-writefile-promise');
const Server = require('static-server');

const run = async (xmlDir = './xml') => {
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
    for (let i = 0; i < files.length; i++) {
        const filePath = resolve(xmlDir, files[i]);
        console.log(filePath);
        const file = (await readFile(filePath)).toString('utf-8').replace(re, 'href="/Common.xsl"');
        await writeFile(filePath, file);
        await page.goto(`http://localhost:3000/xml/${basename(filePath)}`);
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
    }
    outHtml = `<html lang="ru">${outHtml}</html>`;
    await writeFile(resolve('out.html'), outHtml);
    await browser.close();
    server.stop();
};

run();