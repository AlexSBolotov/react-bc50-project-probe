import s from './UserMenu.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserName } from 'redux/auth/authSelectors';
import { logout } from 'redux/auth/authOperations';
import Button from '@mui/material/Button';
export default function UserMenu() {
  const name = useSelector(selectUserName);
  const dispatch = useDispatch();
  return (
    <div className={s.wrapper}>
      <span>Welcome, {name.toUpperCase()}</span>
      <Button
        variant="outlined"
        size="small"
        type="button"
        onClick={() => dispatch(logout())}
      >
        Logout
      </Button>
    </div>
  );
}
