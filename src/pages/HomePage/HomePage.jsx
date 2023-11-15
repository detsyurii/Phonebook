import { Link } from 'react-router-dom';

const HomePage = () => {
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
