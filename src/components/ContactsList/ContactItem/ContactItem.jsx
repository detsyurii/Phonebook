import { useDispatch } from 'react-redux';
import { deleteContactThunk } from 'redux/contacts/contacts.thunk';
import css from './ContactItem.module.css';

export const ContactItem = ({ contact: { name, number, id } }) => {
  const dispatch = useDispatch();

  const handleDeleteContact = () => {
    dispatch(deleteContactThunk(id));
  };

  return (
    <>
      <div className={css.contactContainer}>
        <p className={css.contactText}>
          {name}: {number}
        </p>
        <button
          type="button"
          onClick={handleDeleteContact}
          className={css.deleteButton}
        >
          delete
        </button>
      </div>
    </>
  );
};
