import axios from 'axios';
import * as cheerio from 'cheerio';
import { uniq } from 'lodash';

export async function getFeNews() {
  const { data } = await axios('https://github.com/naver/fe-news');
  const $ = cheerio.load(data);
  const anchorList = $('a[href$=md]').toArray();
  const validAnchorList = anchorList.filter(a =>
    /issues\/.*20\d{2}-\d{2}.md/.test($(a).attr('href') ?? ''),
  );
  return uniq(
    validAnchorList.map(a =>
      `https://github.com/${$(a).attr('href')}`.replace(/\/\//g, '/'),
    ),
  );
}
