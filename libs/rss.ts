import Parser from 'rss-parser';

type CustomFeed = {};
type CustomItem = {
  title: string;
  link: string;
  pubDate: string;
  author: string;
  content: string;
  contentSnippet: string;
  id: string;
  isoDate: string;
};

const parser = new Parser<CustomFeed, CustomItem>({
  customFields: {
    item: [
      'title',
      'link',
      'pubDate',
      'author',
      'content',
      'contentSnippet',
      'id',
      'isoDate',
    ],
  },
});

const getRss = async (url: string) => {
  return parser.parseURL(url);
};

export const getFeNewsRss = () =>
  getRss('https://github.com/naver/fe-news/commits/master.atom');
