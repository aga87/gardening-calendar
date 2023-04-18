import { Auth } from '@/features';
import styles from '@/styles/pages/auth-page.module.scss';

const AuthPage = () => {
  return (
    <div className={styles.authPage}>
      <div>
        <Auth />

        {/* Background image attribution */}
        <footer className={styles.footer}>
          <a
            href='http://www.freepik.com'
            target='_blank'
            rel='noopener noreferrer'
            className={styles.footer__link}
          >
            Image designed by Bimbimkha / Freepik
          </a>
        </footer>
      </div>
    </div>
  );
};

export default AuthPage;
