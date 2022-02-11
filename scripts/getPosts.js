/* eslint-disable */
const path = require('path');
const fs = require('fs');

const dirPath = path.join(__dirname, '../contents/posts');
const postlist = [];

const getPosts = () => {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      return console.log(`Failed to list contents of directory: ${err}`);
    }
    console.log('>> file length: ', files.length);
    files.forEach((file, i) => {
      const obj = {};
      let post;
      const contents = fs.readFileSync(`${dirPath}/${file}`, 'utf8');
      const getMetadataIndices = (acc, elem, i) => {
        if (/^---/.test(elem)) {
          acc.push(i);
        }
        return acc;
      };
      const parseMetadata = ({ lines, metadataIndices }) => {
        if (metadataIndices.length > 0) {
          const metadata = lines.slice(
            metadataIndices[0] + 1,
            metadataIndices[1],
          );
          metadata.forEach(line => {
            obj[line.split(': ')[0]] = line.split(': ')[1];
          });
          return obj;
        }
      };
      const parseContent = ({ lines, metadataIndices }) => {
        if (metadataIndices.length > 0) {
          lines = lines.slice(metadataIndices[1] + 1, lines.length);
        }
        return lines.join('\n');
      };
      const lines = contents.split('\n');
      const metadataIndices = lines.reduce(getMetadataIndices, []);
      const metadata = parseMetadata({ lines, metadataIndices });
      const content = parseContent({ lines, metadataIndices });
      const date = new Date(metadata.date);
      const timestamp = date.getTime() / 1000;
      post = {
        id: timestamp,
        title: metadata.title ? metadata.title : 'No title given',
        author: metadata.author ? metadata.author : 'No author given',
        desc: metadata.desc ? metadata.desc : 'No desc given',
        date: metadata.date ? metadata.date : 'No date given',
        content: content || 'No content given',
      };
      postlist.push(post);
    });

    const sortedList = postlist.sort((a, b) => (a.id < b.id ? 1 : -1));
    console.log('>> json length: ', sortedList.length);
    if (files.length !== sortedList.length) console.log('>> 파싱 에러 <<');
    const data = JSON.stringify(sortedList);
    fs.writeFileSync('jsons/posts.json', data);
  });
};

getPosts();
