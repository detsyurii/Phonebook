import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { STATUS } from 'constants/status.constants';
import { selectAuthStatus } from 'redux/auth/auth.selectors';
import { authLoginThunk } from 'redux/auth/auth.thunk';
import css from './LoginPage.module.css';

const initialState = {
  email: '',
  password: '',
};

const LoginPage = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState(initialState);
  const status = useSelector(selectAuthStatus);

  const handleChange = evt => {
    const { value, name } = evt.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async evt => {
    evt.preventDefault();
    try {
      await dispatch(authLoginThunk(values)).unwrap();
    } catch (error) {
      alert('Oops, something went wrong...');
    }
  };

  return (
    <>
      {status === STATUS.loading && <p>Loading...</p>}
      <form className={css.formContainer} onSubmit={handleSubmit}>
        <h1 className={css.formTitle}>Log In</h1>

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
          Log In
        </button>
      </form>
    </>
  );
};

export default LoginPage;
