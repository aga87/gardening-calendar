import '@/styles/index.scss';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import { Roboto } from 'next/font/google';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { AuthRedirect } from '@/features/auth/components';

const roboto = Roboto({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin']
});

type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? (page => page);

  return (
    <Provider store={store}>
      <AuthRedirect>
        <div className={roboto.className}>
          {getLayout(<Component {...pageProps} />)}
        </div>
      </AuthRedirect>
    </Provider>
  );
};

export default App;
