import { Route, Routes, Navigate } from 'react-router-dom';
import { lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshCurrentUser } from 'redux/auth/authOperations';
import { selectIsLoading } from 'redux/auth/authSelectors';
import SharedLayout from 'components/SharedLayout/SharedLeyout';
import PrivateRoute from 'PrivateRoute';
import PublicRoute from 'PublicRoute';

const HomeView = lazy(() => import('views/HomeView'));
const RegisterView = lazy(() => import('views/RegisterView'));
const LoginView = lazy(() => import('views/LoginView'));
const ContactsView = lazy(() => import('views/ContactsView'));

export function App() {
  const dispatch = useDispatch();
  const isCurrentLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(refreshCurrentUser());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        {!isCurrentLoading && (
          <>
            <Route index element={<HomeView />} />
            <Route
              path="register"
              element={
                <PublicRoute restricted>
                  <RegisterView />
                </PublicRoute>
              }
            />
            <Route
              path="login"
              element={
                <PublicRoute restricted>
                  <LoginView />
                </PublicRoute>
              }
            />
            <Route
              path="contacts"
              element={
                <PrivateRoute>
                  <ContactsView />
                </PrivateRoute>
              }
            ></Route>
            <Route path="contacts" element={<ContactsView />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Route>
    </Routes>
  );
}
