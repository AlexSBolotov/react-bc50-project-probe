import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import ContactList from 'components/ContactList/ContactList';
import { useEffect, useState } from 'react';
import { selectIsLoading, selectError } from 'redux/contacts/contactSelectors';
import { fetchContacts } from 'redux/contacts/contactOperations';
import { useSelector, useDispatch } from 'react-redux';
import UpdateModal from 'components/UpdateModal/UpdateModal';

export default function ContactsView() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const [showModal, setShowModal] = useState(false);
  const [contactToUpdate, setContactToUpdate] = useState({});

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const openModal = contact => {
    setShowModal(true);
    setContactToUpdate(contact);
  };
  const closeModal = () => {
    setShowModal(false);
    setContactToUpdate({});
  };

  return (
    <>
      {!showModal ? (
        <>
          <h1>Phonebook</h1>
          <ContactForm />
          <h2>Contacts</h2>
          <Filter />
          {isLoading && !error && <p>Loading tasks...</p>}

          <ContactList openModal={openModal} />
        </>
      ) : (
        <UpdateModal
          closeModal={closeModal}
          contactToUpdate={contactToUpdate}
        />
      )}
    </>
  );
}
