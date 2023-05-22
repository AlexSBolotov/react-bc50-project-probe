import s from './ContactList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilteredContacts } from 'redux/contacts/contactSelectors';
import { deleteContact } from 'redux/contacts/contactOperations';
import Button from '@mui/material/Button';

export default function ContactList({ openModal }) {
  const filteredContacts = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();

  return (
    <ul className={s.wrapper}>
      {filteredContacts.map(({ id, name, number }) => (
        <li key={id}>
          <div className={s.textWrapper}>
            <p>Name: {name.toUpperCase()}</p>
            <p>Number: {number}</p>
          </div>
          <div className={s.buttonWrapper}>
            <Button
              type="button"
              fullWidth
              size="small"
              onClick={() => openModal({ id, name, number })}
            >
              Update
            </Button>
            <Button
              type="button"
              fullWidth
              size="small"
              onClick={() => dispatch(deleteContact(id))}
            >
              Delete
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}
