import Head from 'next/head';
import Link from 'next/link';
import { Header } from '../components/organisms/Header';
import { Footer } from '../components/organisms/Footer';
import styles from '../styles/Index.module.scss';
import postlist from '../jsons/posts.json';

function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>FE 블로그 | @jangky000</title>
        <meta name="title" content="FE 블로그 | @jangky000" />
        <meta name="keywords" content="FE, ReactJS, NextJS, javascript, typescript" />
        <meta name="description" content="FE 개발자로 일하면서 겪은 경험담을 정리합니다." />
        <meta httpEquiv="Title" content="FE 블로그" />
        <meta httpEquiv="Subject" content="FE 개발자로 일하면서 겪은 경험담을 정리합니다." />

        {/* 기본 설정, 구글, 페이스북, 네이버, 카카오 ... */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jangky000.github.io/blog" />
        <meta property="og:title" content="FE 블로그 | @jangky000" />
        {/* <meta property="og:image" content="" /> */}
        <meta property="og:description" content="FE 개발자로 일하면서 겪은 경험담을 정리합니다." />
        <meta property="og:site_name" content="FE 블로그 | @jangky000" />
        <meta property="og:locale" content="ko_KR" />
        <meta property="og:image:width" content="316" />
        <meta property="og:image:height" content="562" />

        {/* 트위터 */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="FE 블로그 | @jangky000" />
        <meta name="twitter:description" content="FE 개발자로 일하면서 겪은 경험담을 정리합니다." />
        {/* <meta name="twitter:image" content="" /> */}

      </Head>

      <Header />

      <main className={styles.main}>
        <div>Welcome!</div>
        <div>FE 블로그 | @jangky000</div>
        <div>FE 개발자로 일하면서 겪은 경험담을 정리합니다.</div>

        <div style={{ marginTop: '20px' }} />

        <div>
          <div className="postlist">
            <h1 className="title">All Posts</h1>
            {postlist.length
                && postlist.map((post) => (
                  <div key={post.id} className="post-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h2><Link href={`/posts/?title=${post.title.replace(/ /g, '-')}`}><a>{post.title}</a></Link></h2>
                    <small>
                      {post.date}
                      {' '}
                      발행
                      {' '}
                      @
                      {post.author}
                    </small>
                  </div>
                ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
