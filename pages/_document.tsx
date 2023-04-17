import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          <meta
            name="google-site-verification"
            content="DPsgjCONuCmXo7g20zSkClsSwOef21VzS4Ihvwgjna0"
          />
          <meta
            name="naver-site-verification"
            content="e5e67bc35f28f45a7fcf3ee3ea2f5b081ea5ad87"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
