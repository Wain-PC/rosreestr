# rosreestr_xml

This is the simple tool to convert any EGRN excerpts you've reveived from Rosreestr into a single HTML file.

## Installation

`yarn global add rosreestr-xml`

or

`npm i -g rosreestr-xml`

This tool requires Google Chrome to be installed locally (preferably v.62 or higher).

## Usage

### CLI

`rosreestr_xml path/to/folder/with/xmls dist.html --chrome /path/to/chrome/binary/chrome.exe`

### Node.JS

````javascript
const rosreestr = require('rosreestr_xml');

const htmlString = await rosreestr('/path/to/xml', {chrome: '/path/to/chrome/binary/chrome.exe'})
````