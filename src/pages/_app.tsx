import '@/styles/index.scss';
import type { AppProps } from 'next/app';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin']
});

const App = ({ Component, pageProps }: AppProps) => (
  <div className={roboto.className}>
    <Component {...pageProps} />
  </div>
);

export default App;
