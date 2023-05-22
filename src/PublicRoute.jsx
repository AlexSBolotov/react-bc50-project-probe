import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLogin } from 'redux/auth/authSelectors';

export default function PublicRoute({ children, restricted = false }) {
  //   console.log(routeProps);
  const isLogin = useSelector(selectIsLogin);
  const shouldRedirect = isLogin && restricted;
  console.log('shouldRedirect', shouldRedirect);
  return !shouldRedirect ? children : <Navigate replace to="/contacts" />;
}
