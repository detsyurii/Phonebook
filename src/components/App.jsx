import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Layout } from './Layout/Layout';
import { PublicRoutes } from './AuthRoutes/PublicRoutes';
import { PrivateRoutes } from './AuthRoutes/PrivateRoutes';

const HomePage = lazy(() => import('pages/HomePage/HomePage'));
const RegisterPage = lazy(() => import('pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('pages/LoginPage/LoginPage'));
const ContactsPage = lazy(() => import('pages/ContactsPage/ContactsPage'));

export const App = () => {
  return (
    <>
      <Layout>
        <Suspense fallback={<p>Please, wait...</p>}>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="" element={<PublicRoutes />}>
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Route>
            <Route path="" element={<PrivateRoutes />}>
              <Route path="/contacts" element={<ContactsPage />} />
            </Route>
          </Routes>
        </Suspense>
      </Layout>
    </>
  );
};
