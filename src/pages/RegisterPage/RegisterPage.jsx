import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { publicApi } from 'api/api';
import { authLoginThunk } from 'redux/auth/auth.thunk';
import { selectAuthStatus } from 'redux/auth/auth.selectors';
import { STATUS } from 'constants/status.constants';
import css from './RegisterPage.module.css';

const initialState = {
  name: '',
  email: '',
  password: '',
};

const RegisterPage = () => {
  const [values, setValues] = useState(initialState);
  const dispatch = useDispatch();
  const status = useSelector(selectAuthStatus);

  const handleChange = evt => {
    const { value, name } = evt.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async evt => {
    evt.preventDefault();
    try {
      await publicApi.post('/users/signup', values);
      await dispatch(authLoginThunk(values)).unwrap();
      setValues(initialState);
    } catch (error) {
      alert('Oops, something went wrong...');
    }
  };

  return (
    <>
      {status === STATUS.loading && <p>Loading...</p>}
      <form className={css.formContainer} onSubmit={handleSubmit}>
        <h1 className={css.formTitle}>Please Sign Up</h1>

        <div className={css.inputContainer}>
          <input
            id="name"
            name="name"
            type="name"
            autoComplete="off"
            value={values.name}
            onChange={handleChange}
          />
          <label htmlFor="name">Name</label>
        </div>

        <div className={css.inputContainer}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="username"
            value={values.email}
            onChange={handleChange}
          />
          <label htmlFor="email">Email address</label>
        </div>

        <div className={css.inputContainer}>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={values.password}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
        </div>

        <button type="submit" className={css.submitButton}>
          Sign Up
        </button>
      </form>
    </>
  );
};

export default RegisterPage;
