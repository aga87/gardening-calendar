import '@/styles/index.scss';
import type { AppProps } from 'next/app';
import { Roboto } from 'next/font/google';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { AuthRedirect } from '@/features/auth/components';

const roboto = Roboto({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin']
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <AuthRedirect>
        <div className={roboto.className}>
          <Component {...pageProps} />
        </div>
      </AuthRedirect>
    </Provider>
  );
};

export default App;
