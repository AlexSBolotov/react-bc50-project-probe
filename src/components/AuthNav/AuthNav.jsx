import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import s from '../MainNav/MainNav.module.css';
export default function AuthNav() {
  return (
    <div>
      <NavLink
        to="/register"
        className={({ isActive }) => {
          return clsx(isActive ? s.active : s.link);
        }}
      >
        <span>Register</span>
      </NavLink>
      <NavLink
        to="/login"
        className={({ isActive }) => {
          return clsx(isActive ? s.active : s.link);
        }}
      >
        <span>Login</span>
      </NavLink>
    </div>
  );
}
