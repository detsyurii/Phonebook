import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ContactsAddForm } from 'components/ContactsAddForm/ContactsAddForm';
import { ContactsList } from 'components/ContactsList/ContactsList';
import { selectContacts } from 'redux/contacts/contacts.selectors';
import css from './ContactsPage.module.css';

const ContactsPage = () => {
  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);
  const contacts = useSelector(selectContacts);

  const openModal = () => {
    setIsAddContactModalOpen(true);
  };

  const closeModal = () => {
    setIsAddContactModalOpen(false);
  };

  useEffect(() => {
    const handleEscapeKey = event => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    if (isAddContactModalOpen) {
      window.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isAddContactModalOpen]);

  return (
    <>
      <button onClick={openModal} className={css.addButton}>
        Add new contact
      </button>
      {isAddContactModalOpen && (
        <ContactsAddForm closeModal={closeModal} contacts={contacts} />
      )}
      <ContactsList />
    </>
  );
};

export default ContactsPage;
