import { config } from 'config';
import Head from 'next/head';

interface SeoInfo {
  title: string;
  desc: string;
}
interface Props {
  seoInfo?: SeoInfo;
}

function Seo({ seoInfo }: Props) {
  const title = seoInfo?.title ?? config.title;
  const desc = seoInfo?.desc ?? config.description;
  const type = seoInfo?.desc ? 'article' : 'website';

  return (
    // next/head will loop over its direct children, but won't look recursively for nested title, meta, ...
    // https://github.com/vercel/next.js/issues/5774
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta
        name="keywords"
        content="FE, ReactJS, NextJS, javascript, typescript"
      />
      <meta name="description" content={desc} />
      <meta httpEquiv="Title" content={title} />
      <meta httpEquiv="Subject" content={desc} />

      {/* 기본 설정, 구글, 페이스북, 네이버, 카카오 ... */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content="https://jangky000.github.io" />
      <meta property="og:title" content={title} />
      <meta
        property="og:image"
        content="https://user-images.githubusercontent.com/46799722/170039589-53960bc6-5d7c-4558-a752-1a426e63b7d5.png"
      />
      <meta property="og:description" content={desc} />
      <meta property="og:site_name" content={config.title} />
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:image:width" content="316" />
      <meta property="og:image:height" content="562" />

      {/* 트위터 */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
      <meta
        name="twitter:image"
        content="https://user-images.githubusercontent.com/46799722/170039589-53960bc6-5d7c-4558-a752-1a426e63b7d5.png"
      />
    </Head>
  );
}

export default Seo;
