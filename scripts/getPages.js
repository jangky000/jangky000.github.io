/* eslint-disable */
const path = require('path');
const fs = require('fs');

const dirPathPages = path.join(__dirname, '../contents/pages');
const pagelist = [];

const getPages = () => {
  fs.readdir(dirPathPages, (err, files) => {
    if (err) {
      return console.log(`Failed to list contents of directory: ${err}`);
    }
    console.log('>> file length: ', files.length)
    files.forEach((file, i) => {
      let page;
      fs.readFile(`${dirPathPages}/${file}`, 'utf8', (err, contents) => {
        page = {
          content: contents,
        };
        pagelist.push(page);
        const data = JSON.stringify(pagelist);
        fs.writeFileSync('jsons/pages.json', data);
      });
    });
  });
};

getPages();