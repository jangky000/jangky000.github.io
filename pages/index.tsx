import Head from 'next/head';
import Link from 'next/link';
import { StyledHomeLayout } from '@styles/home/style';
import { Footer } from '@components/Footer';
import { Header } from '@components/Header';
import styles from '@styles/Index.module.scss';
import postlist from '@jsons/posts.json';
import { ReactElement } from 'react';
import { removeSpace } from '../lib/utf8';

function Home(): ReactElement {
  return (
    <div className={styles.container}>
      <Head>
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
        {/* <meta property="og:image" content="" /> */}
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
        {/* <meta name="twitter:image" content="" /> */}
      </Head>

      <Header />

      <StyledHomeLayout>
        <div className="introduce">
          <div>Welcome!</div>
          <div>FE 블로그 | @jangky000</div>
          <div>FE 개발자로 일하면서 겪은 경험담을 정리합니다.</div>
        </div>

        <div>
          <div className="postlist">
            <div className="tab">모든 게시글</div>
            {postlist.length &&
              postlist.map(post => (
                <div key={post.id} className="post-card">
                  <h2>
                    <Link
                      href="/posts/[title]"
                      as={`/posts/${removeSpace(post.title)}`}
                    >
                      <a>{post.title}</a>
                    </Link>
                    <small>{post.date}</small>
                  </h2>
                  <div className="desc">
                    <Link
                      href="/posts/[title]"
                      as={`/posts/${removeSpace(post.title)}`}
                    >
                      <a>
                        {post.desc.slice(0, 70)}
                        {post.desc.length > 70 && '...'}
                      </a>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </StyledHomeLayout>

      <Footer />
    </div>
  );
}

export default Home;
