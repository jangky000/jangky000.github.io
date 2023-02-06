import { CONFIGS } from 'configs';
import Head from 'next/head';

interface SeoInfo {
  title: string;
  desc: string;
}
interface Props {
  seoInfo?: SeoInfo;
}

function Seo({ seoInfo }: Props) {
  const title = seoInfo?.title ?? CONFIGS.title;
  const desc = seoInfo?.desc ?? CONFIGS.description;
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
      <meta property="og:site_name" content={CONFIGS.title} />
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

      {/* structured data */}
      <script
        type="application/ld+json"
        /**
         * NOTE: 기존 방법으로 ld+json을 추가했을 때,
         * Google Search Console에서 파싱할 수 없는 구조화된 데이터 > 파싱 오류: '}' 또는 개체 구성 요소 이름 누락 에러 발생,
         * &quot;로 인한 문제로 예상되어 임시적으로 다음과 같이 수정함
         * https://stackoverflow.com/questions/59318263/how-can-i-use-application-ldjson-in-nextjs
         */
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'http://schema.org',
            '@type': 'Person',
            name: CONFIGS.author,
            url: CONFIGS.url,
            sameAs: [CONFIGS.github],
          }),
        }}
      />
    </Head>
  );
}

export default Seo;
