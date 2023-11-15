import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectAuthData } from 'redux/auth/auth.selectors';

export const PrivateRoutes = () => {
  const token = useSelector(selectAuthData);
  return token ? <Outlet /> : <Navigate to={'/login'} replace />;
};
