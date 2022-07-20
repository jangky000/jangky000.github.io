interface SeoInfo {
  title: string;
  desc: string;
}
interface Props {
  seoInfo?: SeoInfo;
}

type OgType = 'website' | 'article';

function Seo({ seoInfo }: Props) {
  const renderMeta = (
    title = 'FE 블로그 | @jangky000',
    desc = 'FE 개발자로 일하면서 겪은 경험담을 정리합니다.',
  ) => {
    return (
      <>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta
          name="keywords"
          content="FE, ReactJS, NextJS, javascript, typescript"
        />
        <meta name="description" content={desc} />
        <meta httpEquiv="Title" content={title} />
        <meta httpEquiv="Subject" content={desc} />
      </>
    );
  };
  const renderOg = (
    title = 'FE 블로그 | @jangky000',
    desc = 'FE 개발자로 일하면서 겪은 경험담을 정리합니다.',
    type: OgType = 'website',
  ) => {
    return (
      <>
        {/* 기본 설정, 구글, 페이스북, 네이버, 카카오 ... */}
        <meta property="og:type" content={type} />
        <meta property="og:url" content="https://jangky000.github.io" />
        <meta property="og:title" content={title} />
        <meta
          property="og:image"
          content="https://user-images.githubusercontent.com/46799722/170039589-53960bc6-5d7c-4558-a752-1a426e63b7d5.png"
        />
        <meta property="og:description" content={desc} />
        <meta property="og:site_name" content="FE 블로그 | @jangky000" />
        <meta property="og:locale" content="ko_KR" />
        <meta property="og:image:width" content="316" />
        <meta property="og:image:height" content="562" />
      </>
    );
  };
  const renderTwitter = (
    title = 'FE 블로그 | @jangky000',
    desc = 'FE 개발자로 일하면서 겪은 경험담을 정리합니다.',
  ) => {
    return (
      <>
        {/* 트위터 */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <meta
          name="twitter:image"
          content="https://user-images.githubusercontent.com/46799722/170039589-53960bc6-5d7c-4558-a752-1a426e63b7d5.png"
        />
      </>
    );
  };

  const homeSeo = (
    <>
      {renderMeta()}
      {renderOg()}
      {renderTwitter()}
    </>
  );

  const detailSeo = (detailInfo: SeoInfo) => {
    const { title, desc } = detailInfo;
    return (
      <>
        {renderMeta(title, desc)}
        {renderOg(title, desc, 'article')}
        {renderTwitter(title, desc)}
      </>
    );
  };
  return seoInfo ? detailSeo(seoInfo) : homeSeo;
}

export default Seo;
