import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { selectAuthData } from 'redux/auth/auth.selectors';

export const PublicRoutes = () => {
  const token = useSelector(selectAuthData);
  const location = useLocation();

  return token ? (
    <Navigate to={location?.state?.from ?? '/'} replace />
  ) : (
    <Outlet />
  );
};
