import '@styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import ThemeProvider from 'providers/ThemeProvider';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <ThemeProvider>
              <Component {...pageProps} />
            </ThemeProvider>
          </Hydrate>
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
}
export default MyApp;
