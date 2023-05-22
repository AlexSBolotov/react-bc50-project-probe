import LoginForm from 'components/LoginForm/LoginForm';

import s from '../components/SharedLayout/SharedLayout.module.css';
export default function LoginView() {
  return (
    <div className={s.container}>
      <h1>Login to view your contacts</h1>
      <LoginForm />
    </div>
  );
}
