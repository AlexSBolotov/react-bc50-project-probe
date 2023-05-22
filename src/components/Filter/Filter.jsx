import s from './Filter.module.css';
import { useDispatch } from 'react-redux';
import { setFilter } from 'redux/contacts/filterSlice';
import TextField from '@mui/material/TextField';

export default function Filter() {
  const dispatch = useDispatch();
  const handlerOnChange = e => {
    const value = e.target.value;
    dispatch(setFilter(value));
  };

  return (
    <div className={s.wrapper}>
      <TextField
        fullWidth
        label="Find contacts by name"
        id="filter"
        name="filter"
        onChange={handlerOnChange}
        placeholder="Find contacts by name..."
      />
    </div>
  );
}
