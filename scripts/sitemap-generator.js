const path = require('path');
const fs = require('fs');
const globby = require('globby');
const prettier = require('prettier');
const postlist = require('../jsons/posts.json');

const getDate = new Date().toISOString();

const YOUR_AWESOME_DOMAIN = 'https://jangky000.github.io/blog';

const formatted = (sitemap) => prettier.format(sitemap, { parser: 'html' });

(async () => {
  const pages = await globby([
    // include
    path.join(__dirname, '../pages/**/*.tsx'),
    path.join(__dirname, '../pages/*.tsx'),
    // exclude
    path.join('!', __dirname, '../pages/_*.tsx'),
    path.join('!', __dirname, '../pages/**/[title].tsx'),
  ]);

  const pagesSitemap = `
    ${pages
    .map((page) => {
      const subPath = page
        .replace(/.+\/pages\//, '')
        .replace('.tsx', '')
        .replace(/\/index/g, '');
      const routePath = subPath === 'index' ? '' : subPath;
      return `
          <url>
            <loc>${YOUR_AWESOME_DOMAIN}/${routePath}</loc>
            <lastmod>${getDate}</lastmod>
          </url>
        `;
    })
    .join('')}
  `;

  const postSitemap = postlist.map((post) => `
    <url>
      <loc>${YOUR_AWESOME_DOMAIN}/posts/${post.id}</loc>
      <lastmod>${getDate}</lastmod>
    </url>
  `);

  const generatedSitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
    >
      ${pagesSitemap}
      ${postSitemap}
    </urlset>
  `;

  const formattedSitemap = [formatted(generatedSitemap)];

  fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), formattedSitemap.toString(), 'utf8');
})();
