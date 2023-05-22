import { useSelector } from 'react-redux';
import UserMenu from 'components/UserMenu/UserMenu';
import MainNav from 'components/MainNav/MainNav';
import AuthNav from 'components/AuthNav/AuthNav';
import { selectIsLogin } from 'redux/auth/authSelectors';
import s from './Header.module.css';
export default function Header() {
  const isLogin = useSelector(selectIsLogin);
  return (
    <header className={s.header}>
      <MainNav />
      {!isLogin ? <AuthNav /> : <UserMenu />}
    </header>
  );
}
