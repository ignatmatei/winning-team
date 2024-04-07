import { Link } from 'react-router-dom';
import styles from './Logo.module.css';
import { useAuth } from '../contexts/FakeAuthContext';

function Logo() {
  const { isAuthenticated } = useAuth();
  return (
    <Link to={!isAuthenticated ? '/' : '/app'}>
      <img src="/logo.png" alt="Byte logo" className={styles.logo} />
    </Link>
  );
}

export default Logo;
