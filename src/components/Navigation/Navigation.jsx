import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthData, selectProfile } from 'redux/auth/auth.selectors';
import { authLogoutThunk, getProfileThunk } from 'redux/auth/auth.thunk';
import css from './Navigation.module.css';

export const Navigation = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const token = useSelector(selectAuthData);
  const profile = useSelector(selectProfile);

  useEffect(() => {
    if (token) {
      dispatch(getProfileThunk());
    }
  }, [token, dispatch]);

  const handleLogout = () => {
    dispatch(authLogoutThunk());
  };

  return (
    <div className={css.navBox}>
      <div className={css.linkContainer}>
        <NavLink to="/" className={css.link}>
          Home
        </NavLink>

        {token ? (
          <NavLink to="/contacts" className={css.link}>
            Contacts
          </NavLink>
        ) : (
          <>
            <NavLink to="/register" className={css.link}>
              Register
            </NavLink>
            <NavLink
              to="/login"
              state={{ from: location }}
              className={css.link}
            >
              Login
            </NavLink>
          </>
        )}
      </div>
      {token && profile ? (
        <div className={css.linkContainer}>
          <p className={css.userInvitation}>Welcome back, {profile?.name}</p>{' '}
          <button
            type="button"
            className={css.logoutButton}
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      ) : null}
    </div>
  );
};
