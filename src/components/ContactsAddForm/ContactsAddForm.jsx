import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { addContactThunk } from 'redux/contacts/contacts.thunk';
import css from './ContactsAddForm.module.css';

export const ContactsAddForm = ({ closeModal, contacts }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();

  const inputNameId = nanoid();
  const inputNumberId = nanoid();

  const handleChange = evt => {
    const { name, value } = evt.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const verifiedContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (verifiedContact) {
      alert(`Contact ${name} already exists`);
      return;
    }
    const id = nanoid();
    dispatch(addContactThunk({ id, name, number }));
    setName('');
    setNumber('');
    closeModal();
  };

  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      <div className={css.modalContainer} onClick={handleBackdropClick}>
        <div className={css.modalContent}>
          <div className={css.form}>
            <button onClick={closeModal} className={css.closeButton}>
              &times;
            </button>
            <form action="" onSubmit={handleSubmit}>
              <label htmlFor={inputNameId} className={css.label}>
                <p>Name</p>
                <input
                  onChange={handleChange}
                  id={inputNameId}
                  type="text"
                  name="name"
                  value={name}
                  className={css.input}
                  title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                  required
                />
              </label>
              <label htmlFor={inputNumberId} className={css.label}>
                <p>Number</p>{' '}
                <input
                  id={inputNumberId}
                  onChange={handleChange}
                  type="tel"
                  name="number"
                  value={number}
                  className={css.input}
                  title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                  required
                />
              </label>

              <button type="submit" className={css.button}>
                Add contact
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
