import { Navigation } from '../Navigation/Navigation';
import css from './Layout.module.css';

export const Layout = ({ children }) => {
  return (
    <>
      <Navigation />

      <div className={css.box}>{children}</div>

      <footer className={css.footer}>
        <p>
          &copy; Created by{' '}
          <a
            href="https://www.linkedin.com/in/yurii-dets/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dets Yurii
          </a>{' '}
          {new Date().getFullYear()}
        </p>
      </footer>
    </>
  );
};
