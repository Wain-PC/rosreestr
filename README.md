# rosreestr_xml

This is the simple tool to convert any EGRN excerpts you've reveived from Rosreestr into a single HTML file.

## Installation

`yarn global add rosreestr-xml`

or

`npm i -g rosreestr-xml`

or just use `npx` to run without installing.

This tool requires Google Chrome to be installed locally (preferably v.62 or higher).

It will try its best to locate Chrome binary automatically on your system using [chrome-location](https://www.npmjs.com/package/chrome-location), but you can also pass it manually with `--chrome` flag (see examples below);

## Usage

### CLI

#### Simple
Run `rosreestr_xml` in directory with XML files. It'll output

#### Advanced
`rosreestr_xml path/to/folder/with/xmls dist.html --chrome /path/to/chrome/binary/chrome.exe`

### Node.JS

````javascript
const rosreestr = require('rosreestr_xml');

const htmlString = await rosreestr('/path/to/folder/with/xmls', {chrome: 
'/path/to/chrome/binary/chrome.exe'})
````
