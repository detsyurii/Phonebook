import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ContactItem } from './ContactItem/ContactItem';
import { getContactsThunk } from 'redux/contacts/contacts.thunk';
import { selectContacts } from 'redux/contacts/contacts.selectors';
import css from './ContactsList.module.css';

export const ContactsList = () => {
  const [filter, setFilter] = useState('');
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  useEffect(() => {
    dispatch(getContactsThunk());
  }, [dispatch]);

  const handleChangeFilter = evt => {
    const { value } = evt.currentTarget;
    setFilter(value);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <div className={css.filterContainer}>
        <h3>Find contacts by name</h3>
        <input
          type="text"
          className={css.filterInput}
          onChange={handleChangeFilter}
          value={filter}
        />
      </div>

      <ul className={css.contactList}>
        {filteredContacts?.map(contact => {
          return (
            <li key={contact.id}>
              <ContactItem contact={contact} />
            </li>
          );
        })}
      </ul>
    </>
  );
};
