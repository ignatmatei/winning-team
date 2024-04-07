import Logo from './Logo';
import styles from './Sidebar.module.css';
import ChatList from '../components/ChatList';

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <br></br>
      <br></br>
      <ChatList />
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by Byte System.
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;
