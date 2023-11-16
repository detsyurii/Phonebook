import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { authLoginThunk } from 'redux/auth/auth.thunk';
import { testingUser } from 'assets/testing-user';
import { selectAuthData } from 'redux/auth/auth.selectors';

const HomePage = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectAuthData);

  const handleLogin = async () => {
    try {
      await dispatch(
        authLoginThunk({
          email: testingUser.email,
          password: testingUser.password,
        })
      ).unwrap();
    } catch (error) {
      alert('Oops, something went wrong...');
    }
  };

  return (
    <>
      <section>
        <h2>About</h2>
        <p>
          Introducing simple web application for contact management. It allows
          you to store your <Link to={'/contacts'}>Contacts</Link> in the cloud.{' '}
          <Link to={'/register'}>Register</Link> your account or{' '}
          <Link to={'/login'}>log in</Link> using your email and password to
          access your personal contacts notebook. The phone book is accessible
          from any device and browser.
        </p>
        {!token && (
          <p>
            Or you can use the existing account of{' '}
            <Link to="#" onClick={handleLogin}>
              {testingUser.name}{' '}
            </Link>{' '}
            to test the application.
          </p>
        )}
        <p>Frameworks and libraries integrated in this application include:</p>
        <ul>
          <li>React</li>
          <li>Redux</li>
          <li>redux-toolkit</li>
          <li>React-router-dom</li>
          <li>React-persist</li>
          <li>Axios</li>
        </ul>
      </section>
    </>
  );
};

export default HomePage;

