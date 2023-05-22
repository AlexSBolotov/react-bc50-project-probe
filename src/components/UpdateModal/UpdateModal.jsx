import s from './UpdateModal.module.css';
import { updateContact } from 'redux/contacts/contactOperations';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const modalRoot = document.querySelector('#modal-root');

export default function UpdateModal({ closeModal, contactToUpdate }) {
  const [name, setName] = useState(contactToUpdate.name);
  const [number, setNumber] = useState(contactToUpdate.number);
  const dispatch = useDispatch();

  const onInputChange = e => {
    const input = e.target;
    switch (input.name) {
      case 'name':
        setName(input.value);
        break;
      case 'number':
        setNumber(input.value);
        break;
      default:
        return;
    }
  };
  const onCancelClick = () => {
    closeModal();
  };
  const onUpdateClick = () => {
    dispatch(
      updateContact({ id: contactToUpdate.id, name: name, number: number })
    );
    closeModal();
  };
  const handleKeydown = e => {
    if (e.code === 'Escape') closeModal();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  });
  return createPortal(
    <div className={s.overlay}>
      <div className={s.wrapper}>
        <h2>Update contact</h2>
        <TextField
          fullWidth
          label="Change name"
          id="name"
          name="name"
          value={name}
          onChange={onInputChange}
          placeholder="Enter contact name..."
          required
        />
        <TextField
          fullWidth
          label="Change number"
          id="number"
          name="number"
          value={number}
          onChange={onInputChange}
          placeholder="Enter contact phone number..."
          required
        />
        <div className={s.btnWrapper}>
          <Button variant="outlined" type="button" onClick={onUpdateClick}>
            Update
          </Button>
          <Button variant="outlined" type="button" onClick={onCancelClick}>
            Cancel
          </Button>
        </div>
      </div>
    </div>,
    modalRoot
  );
}

UpdateModal.propTypes = {
  contactToUpdate: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    number: PropTypes.string,
  }),
  closeModal: PropTypes.func,
};
