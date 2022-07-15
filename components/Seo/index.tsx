import { Post } from 'types/post';

interface Props {
  detailInfo?: Post;
}

function Seo({ detailInfo }: Props) {
  const homeSeo = (
    <>
      <title>FE 블로그 | @jangky000</title>
      <meta name="title" content="FE 블로그 | @jangky000" />
      <meta
        name="keywords"
        content="FE, ReactJS, NextJS, javascript, typescript"
      />
      <meta
        name="description"
        content="FE 개발자로 일하면서 겪은 경험담을 정리합니다."
      />
      <meta httpEquiv="Title" content="FE 블로그" />
      <meta
        httpEquiv="Subject"
        content="FE 개발자로 일하면서 겪은 경험담을 정리합니다."
      />

      {/* 기본 설정, 구글, 페이스북, 네이버, 카카오 ... */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://jangky000.github.io" />
      <meta property="og:title" content="FE 블로그 | @jangky000" />
      <meta
        property="og:image"
        content="https://user-images.githubusercontent.com/46799722/170039589-53960bc6-5d7c-4558-a752-1a426e63b7d5.png"
      />
      <meta
        property="og:description"
        content="FE 개발자로 일하면서 겪은 경험담을 정리합니다."
      />
      <meta property="og:site_name" content="FE 블로그 | @jangky000" />
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:image:width" content="316" />
      <meta property="og:image:height" content="562" />

      {/* 트위터 */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="FE 블로그 | @jangky000" />
      <meta
        name="twitter:description"
        content="FE 개발자로 일하면서 겪은 경험담을 정리합니다."
      />
      <meta
        name="twitter:image"
        content="https://user-images.githubusercontent.com/46799722/170039589-53960bc6-5d7c-4558-a752-1a426e63b7d5.png"
      />
    </>
  );

  const detailSeo = (postInfo: Post) => (
    <>
      <title>FE 블로그 | @jangky000</title>
      <meta name="title" content={postInfo.title} />
      <meta
        name="keywords"
        content="FE, ReactJS, NextJS, javascript, typescript"
      />
      <meta name="description" content={postInfo.desc} />
      <meta httpEquiv="Title" content={postInfo.title} />
      <meta httpEquiv="Subject" content={postInfo.title} />

      {/* 기본 설정, 구글, 페이스북, 네이버, 카카오 ... */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://jangky000.github.io" />
      <meta property="og:title" content={postInfo.title} />
      <meta
        property="og:image"
        content="https://user-images.githubusercontent.com/46799722/170039589-53960bc6-5d7c-4558-a752-1a426e63b7d5.png"
      />
      <meta property="og:description" content={postInfo.desc} />
      <meta property="og:site_name" content="FE 블로그 | @jangky000" />
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:image:width" content="316" />
      <meta property="og:image:height" content="562" />

      {/* 트위터 */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={postInfo.title} />
      <meta name="twitter:description" content={postInfo.desc} />
      <meta
        name="twitter:image"
        content="https://user-images.githubusercontent.com/46799722/170039589-53960bc6-5d7c-4558-a752-1a426e63b7d5.png"
      />
    </>
  );
  return detailInfo ? detailSeo(detailInfo) : homeSeo;
}

export default Seo;
